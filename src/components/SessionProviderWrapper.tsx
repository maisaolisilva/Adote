'use client';  // Este componente será renderizado no lado do cliente

//Sessões servem para manter o usuário autenticado e permite acesso a informações protegidas
//Ao envolver a aplicação, permite o acessa a sessão (dados do usuário) em qualquer parte da aplicação
import { SessionProvider } from 'next-auth/react';

export default function SessionProviderWrapper({children,}: {children: React.ReactNode;}) {
  return <SessionProvider>{children}</SessionProvider>;
}
