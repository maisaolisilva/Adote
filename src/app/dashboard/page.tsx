'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

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
    &:hover {
      background-color: #789DBC;
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
      <h1>Meu Dashboard</h1>
      <button onClick={() => router.push('/dashboard/new')}>Cadastrar Novo Animal</button>
      <ul>
        {animals.map((animal) => (
          <li key={animal.id}>
            <img src={animal.imageUrl} alt="Imagem do animal" />
            <p>História: {animal.story}</p>
            <p>Idade Aproximada: {animal.approximateAge}</p>
            <p>Gênero: {animal.gender}</p>
            <p>Porte: {animal.size}</p>
            <p>Vacinado: {animal.vaccinated ? 'Sim' : 'Não'}</p>
            <p>Comportamento: {animal.behavior}</p>
            <p>Contato: {animal.contact}</p>
            <button onClick={() => router.push(`/dashboard/edit/${animal.id}`)}>Editar</button>
            <button onClick={() => handleDelete(animal.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </DashboardContainer>
  );
}
