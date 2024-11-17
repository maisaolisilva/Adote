'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import Titulo from '@/components/Titulo';
import Image from 'next/image';
import { AvatarUploader } from '@/components/AvatarUpload';

const ProfileContainer = styled.section`
  display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
`;

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    profileImageUrl: '',
  });

  // Redireciona se não autenticado
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  // Busca dados do usuário ao autenticar
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(`/api/users/${session?.user?.id.toString()}`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error("Usuário não encontrado ou erro na resposta da API");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário: ", error);
      }
    }
    if (status === 'authenticated' && session?.user?.id) {
      fetchUserData();
    }
  }, [status, session]);


  if (status === 'loading') return <p>Carregando...</p>;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/users/${session?.user?.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        alert('Perfil atualizado com sucesso!');
      } else {
        alert('Erro ao atualizar perfil.');
      }
    } catch (error) {
      console.error("Erro ao enviar dados: ", error)
    }
  };

  return (
    <ProfileContainer>
      <Titulo>Perfil do Usuário</Titulo>
      {userData.profileImageUrl && (
        <Image
          src={userData.profileImageUrl}
          alt="Foto de Perfil"
          width={150}
          height={150}
          style={{ borderRadius: '50%' }}
        />
      )}
      <AvatarUploader
        onUploadSuccess={(url) =>
          setUserData((prev) => ({ ...prev, profileImageUrl: url }))
        }
      />
      <form onSubmit={handleSubmit}>
        <label>Nome Completo</label>
        <input
          type="text"
          name="fullName"
          value={userData.fullName}
          onChange={handleInputChange}
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          disabled
        />
        <label>Telefone</label>
        <input
          type="text"
          name="phone"
          value={userData.phone}
          onChange={handleInputChange}
        />
        <label>Endereço</label>
        <input
          type="text"
          name="address"
          value={userData.address}
          onChange={handleInputChange}
        />
        <button type="submit">Salvar Alterações</button>
      </form>
    </ProfileContainer>
  );
}
