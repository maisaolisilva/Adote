'use client';
import Titulo from '@/components/Titulo';
import styled from 'styled-components';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const StyledSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    width: 100%;
    max-width: 600px;
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

export default function RegisterPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, nome, endereco }),
        });
        const data = await response.json();
        if (response.ok) {
            // Registro bem-sucedido, redirecionar ou mostrar mensagem
            router.push('/auth/signin'); // Redireciona para a página de login
        } else {
            // Exibe mensagem de erro
            setError(data.message);
        }
    };
    return (
        <StyledSection>
            <Titulo>Cadastro</Titulo>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Nome completo:
                    <input
                        type="email"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Senha
                    <input
                        type="email"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <label>
                   Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                   Endereço:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEndereco(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Registrar</button>
            </form>
        </StyledSection>
    )
}