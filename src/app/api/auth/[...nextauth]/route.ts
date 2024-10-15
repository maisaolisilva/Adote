//API Route lida com a autenticação
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials'; //permite autenticação personalizada com emais e senha

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
        // Simulação de validação (substituir por lógica real de autenticação)
        const user = { id: '1', name: 'John Doe', email: 'john@example.com' };
        if (credentials?.email === 'john@example.com' && credentials?.password === '1234') {
          return user;
        }
        return null; // Autenticação falhou
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',  // Página de login personalizada
  },
  secret: process.env.NEXTAUTH_SECRET,  // Variável de ambiente para o segredo
};

//inicialização do NextAuth com Route Handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
