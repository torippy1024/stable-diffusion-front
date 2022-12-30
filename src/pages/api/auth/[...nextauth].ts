import NextAuth, {NextAuthOptions} from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import GithubProvider from 'next-auth/providers/github';
import {
  PreviewCredentialsProvider,
  refreshAccessToken,
} from '../../../utils/auth';

const NEED_REFRESH_TOKEN = false;

export const authOptions: NextAuthOptions = {
  providers: [
    ...(process.env.VERCEL_ENV === 'preview'
      ? [PreviewCredentialsProvider()]
      : []),
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID || '',
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
  callbacks: {
    async jwt({token, user, account}) {
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at
            ? Date.now() + account.expires_at * 1000
            : undefined,
          refreshToken: account.refresh_token,
          user,
        };
      }
      if (!NEED_REFRESH_TOKEN) {
        return token;
      }
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }
      return refreshAccessToken(token);
    },
    async session({session, token}) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error;

      return session;
    },
  },
};

export default NextAuth(authOptions);
