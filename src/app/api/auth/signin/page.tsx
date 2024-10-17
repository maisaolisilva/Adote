'use client'; //para ser renderizado do lado do client
//Página para os usuários inserirem as credenciais
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Titulo from '@/components/Titulo';

const StyledSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    text-align: center;
    input{
        border: 2px solid #789DBC;
        width: 100%;
        height: 30px;
        margin: 2px 0;
        border-radius: 20px;
        text-align: center;
        font-size: 16px;
    }

    label{
        font-size: 24px;
        color: #624E88;
    }
    
    button{
        background-color: #624E88;
        border: none;
        padding: 0.5em 2em;
        border-radius: 20px;
        font-size: 24px;
        color: #FEF9F2;
        margin-top: 20px;
        &:hover{
            cursor: pointer;
            opacity: 0.8;
        }
    }
`

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
    <StyledSection>
      <Titulo>Login</Titulo>
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
    </StyledSection>
  );
}
