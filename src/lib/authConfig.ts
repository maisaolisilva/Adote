import bcrypt from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthOptions } from 'next-auth';
import User from '@/models/User';
import { dbConnect } from '@/lib/mongodb';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          await dbConnect();

          if (!credentials?.email || !credentials.password) {
            return null;
          }

          const user = await User.findOne({ email: credentials.email });

          if (user && user.password && (await bcrypt.compare(credentials.password, user.password))) {
            return { id: user._id.toString(), name: user.fullName, email: user.email };
          }

          return null;
        } catch (error) {
          console.error('Erro na função authorize:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.id) {
        session.user = { ...session.user, id: token.id as string };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
