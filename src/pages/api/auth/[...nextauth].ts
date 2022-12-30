import NextAuth, {NextAuthOptions} from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import {sha512} from 'js-sha512';

const scope = [
  'playlist-read-private',
  'streaming',
  'user-read-private',
  'user-library-read',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-recently-played',
  'user-follow-read',
];

type RefreshResponseType = {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  expires_in: number;
  scope: string;
};

const refreshAccessToken = async (token: any) => {
  try {
    const url =
      'https://accounts.spotify.com/api/token?' +
      new URLSearchParams({
        client_id: process.env.SPOTIFY_CLIENT_ID || '',
        client_secret: process.env.SPOTIFY_CLIENT_SECRET || '',
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      });

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    });

    const refreshedTokens = (await response.json()) as RefreshResponseType;

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.error(error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    ...(process.env.VERCEL_ENV === 'preview'
      ? [
          CredentialsProvider({
            name: 'Credentials',
            credentials: {
              username: {
                label: 'Username',
                type: 'text',
                placeholder: 'name',
              },
              password: {label: 'Password', type: 'password'},
            },
            async authorize(credentials) {
              const hash = sha512(credentials?.password || '');
              if (
                process.env.NEXTAUTH_CREDENTIAL_HASH &&
                hash === process.env.NEXTAUTH_CREDENTIAL_HASH
              ) {
                return {
                  id: 'id',
                  name: credentials?.username,
                  email: 'email@example.com',
                };
              } else {
                return null;
              }
            },
          }),
        ]
      : []),
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID || '',
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
      authorization: `https://accounts.spotify.com/authorize?scope=${scope.join()}`,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
  callbacks: {
    async jwt({token, account}) {
      if (account) {
        token.id = account.id;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires =
          account.expires_at && account.expires_at * 1000;
      }
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({session, token}) {
      // session.token = token;

      return session;
    },
  },
};

export default NextAuth(authOptions);
