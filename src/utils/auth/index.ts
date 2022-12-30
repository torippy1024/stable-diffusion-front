import {JWT} from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import {sha512} from 'js-sha512';

type RefreshResponseType = {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  expires_in: number;
  scope: string;
};

export const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  try {
    const url =
      'https://accounts.hoge.com/api/token?' +
      new URLSearchParams({
        client_id: process.env.SPOTIFY_CLIENT_ID || '',
        client_secret: process.env.SPOTIFY_CLIENT_SECRET || '',
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken || '',
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

export const PreviewCredentialsProvider = () => {
  return CredentialsProvider({
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
  });
};
