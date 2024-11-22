//API Route que lida com a autenticação
//arquivos route.ts dentro da pasta api são identificados pelo next.js como rode de API e exporta handlers HTTP
import { authOptions } from '@/lib/authConfig';
import NextAuth from 'next-auth';


//inicialização do NextAuth com Route Handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
