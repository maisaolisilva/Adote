//API Route que lida com a autenticação
//arquivos route.ts dentro da pasta api são identificados pelo next.js como rode de API e exporta handlers HTTP
import bcrypt  from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials'; //permite autenticação personalizada com emais e senha
import User from '@/models/User';
import clientPromise from '@/lib/mongodb';
import { dbConnect } from '@/lib/mongodb';
import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';


const authOptions = {
    //Lista de provedores de autenticação
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      //função que verifica a validação das credenciais
      async authorize(credentials) {
        await dbConnect();
       try{ // conecta ao MongoDB usando clientPromise
          await clientPromise;

          //verifica se as credenciais estão definidas
          if (!credentials?.password || !credentials.email) {
            return null;
          }

          // Busca o utilizador no MongoDB pelo email
          const user = await User.findOne({ email: credentials?.email });

          //verifica se o utilizador existe e se user.password está definido
          if (user && user.password && await bcrypt.compare(credentials.password, user.password)) {
            return { id: user._id.toString(), name: user.fullName, email: user.email };
          }
          return null; // Autenticação falhou
      } catch (error) {
        console.error("erro na função authorize: ",error);
        return null;
      }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.id) {
        session.user.id = token.id as string;  // Inclui `id` na sessão
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: { id: string } }) {
      if (user) {
        token.id = user.id;  // Inclui `id` no token JWT
      }
      return token;
    },
  },
  
  pages: {
    signIn: '/auth/signin',  // Página de login personalizada
  },
  secret: process.env.NEXTAUTH_SECRET,  // Variável de ambiente para o segredo
};

//inicialização do NextAuth com Route Handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
