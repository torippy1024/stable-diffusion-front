import NextAuth, {NextAuthOptions} from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import {
  PreviewCredentialsProvider,
  refreshAccessToken,
} from '../../../utils/auth';
import {COMMON_CONFIG} from '../../../components/const';

export const authOptions: NextAuthOptions = {
  providers: [
    ...(process.env.VERCEL_ENV === 'preview'
      ? [PreviewCredentialsProvider()]
      : []),
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
      if (!COMMON_CONFIG.NEED_REFRESH_TOKEN) {
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
