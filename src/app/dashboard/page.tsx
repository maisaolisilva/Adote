'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { format } from 'date-fns';
import Titulo from '@/components/Titulo';

const DashboardContainer = styled.section`
  padding: 20px;
  max-width: 800px;
  margin: auto;
  text-align: center;

  h1 {
    color: #624E88;
  }

  button {
    margin: 10px;
    padding: 10px 20px;
    border: none;
    background-color: #624E88;
    color: #FFF;
    border-radius: 5px;
    cursor: pointer;
    &:hover{
          cursor: pointer;
          opacity: 0.8;
    }
  }

  .botao-grande{
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

  ul {
    list-style: none;
    padding: 0;

    li {
      margin: 20px 0;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      text-align: left;

      img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 5px;
      }

      p {
        margin: 5px 0;
      }
    }
  }
`;

interface Animal {
  id: string;
  imageUrl: string;
  story: string;
  approximateAge: string;
  gender: string;
  size: string;
  vaccinated: boolean;
  dewormed: boolean;
  behavior: string;
  contact: string;
  type: string;
  postedAt: Date;
}

export default function DashboardPage() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const router = useRouter();

  //acessa a api para buscar todops os animais que um usuário cadastrou
  useEffect(() => {
    async function fetchUserAnimals() {
      const response = await fetch('/api/dashboard/animals');
      if (response.ok) {
        const data = await response.json();
        setAnimals(data); // Atualiza a lista de animais no estado
      } else {
        console.error('Erro ao buscar os animais');
      }
    }
    fetchUserAnimals();
  }, []);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('Tem certeza que deseja excluir este animal?');
    if (confirm) {
      const response = await fetch(`/api/animals/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        alert('Animal excluído com sucesso.');
        setAnimals(animals.filter((animal) => animal.id !== id));
      }
    }
  };

  return (
    <DashboardContainer>
      <Titulo>Meu Dashboard</Titulo>
      <button className= 'botao-grande' onClick={() => router.push('/dashboard/new')}>Cadastrar Novo Animal</button>
      <ul>
        {animals.map((animal) => (
          <li key={animal.id}>
            <img src={animal.imageUrl} alt="Imagem do animal" />
            <p>Tipo: {animal.type}</p>
            <p>História: {animal.story}</p>
            <p>Idade Aproximada: {animal.approximateAge}</p>
            <p>Gênero: {animal.gender}</p>
            <p>Porte: {animal.size}</p>
            <p>Vacinado: {animal.vaccinated ? 'Sim' : 'Não'}</p>
            <p>Vermifugado: {animal.dewormed ? 'Sim' : 'Não'}</p>
            <p>Comportamento: {animal.behavior}</p>
            <p>Contato: {animal.contact}</p>
            <p>Postado em: {format(new Date(animal.postedAt), 'dd/MM/yyyy')}</p>
            <button onClick={() => router.push(`/dashboard/edit/${animal.id}`)}>Editar</button>
            <button onClick={() => handleDelete(animal.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </DashboardContainer>
  );
}
