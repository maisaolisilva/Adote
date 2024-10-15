'use client';

import { useSession, signOut } from 'next-auth/react';

export default function UserProfile() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Carregando...</p>;
  }

  if (status === 'unauthenticated') {
    return <p>Não estás autenticado</p>;
  }

  return (
    <div>
      <h1>Perfil do Utilizador</h1>
      <p>Email: {session?.user?.email}</p>
      <button onClick={() => signOut()}>Sair</button>
    </div>
  );
}
