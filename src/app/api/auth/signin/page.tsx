'use client'; //para ser renderizado do lado do client
//Página para os usuários inserirem as credenciais
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

//Página de login personalizada
export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Faz uma chamada à API do NextAuth para autenticar o utilizador com base nas credenciais fornecidas 
    const result = await signIn('credentials', {
      redirect: false,  // Desativa o redirecionamento automático após login
      email,
      password,
    });

    if (result?.error) {
      setError('Falha no login. Verifique o email ou senha.');
    } else {
      // Redireciona para a página inicial após login
      router.push('/');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
