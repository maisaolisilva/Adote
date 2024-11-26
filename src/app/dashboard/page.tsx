'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { format } from 'date-fns';
import Titulo from '@/components/Titulo';
import { useAnimals } from '@/components/AnimalContext';

const DashboardContainer = styled.section`
  padding: 20px;
  max-width: 100%;
  text-align: center;
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
      border: 1px solid #624E88;
      border-radius: 5px;
      text-align: left;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

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


export default function DashboardPage() {
  const { state: animals, dispatch } = useAnimals();
  const router = useRouter();

  //acessa a api para buscar todops os animais que um usuário cadastrou
  useEffect(() => {
    async function fetchUserAnimals() {
      const response = await fetch('/api/dashboard/animals');
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: 'SET_ANIMALS', payload: data }); // Atualiza a lista de animais no estado
      } else {
        console.error('Erro ao buscar os animais');
      }
    }
    fetchUserAnimals();
  }, [dispatch]);

  const handleDelete = async (id: string | undefined) => {
    const confirm = window.confirm('Tem certeza que deseja excluir este animal?');
    if (confirm) {
      const response = await fetch(`/api/animals/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        alert('Animal excluído com sucesso.');
        dispatch({ type: 'REMOVE_ANIMAL', payload: id });
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
            <div className="descricao">
              <p>Tipo: {animal.type}</p>
              <p>História: {animal.story}</p>
              <p>Idade Aproximada: {animal.approximateAge}</p>
              <p>Gênero: {animal.gender}</p>
              <p>Porte: {animal.size}</p>
              <p>Vacinado: {animal.vaccinated ? 'Sim' : 'Não'}</p>
              <p>Vermifugado: {animal.dewormed ? 'Sim' : 'Não'}</p>
              <p>Comportamento: {animal.behavior}</p>
              <p>Contato: {animal.contact}</p>
              <p>Postado em: {format(new Date(animal.postdAt), 'dd/MM/yyyy')}</p>
            </div>
            <div className="botoes">
              <button onClick={() => router.push(`/dashboard/edit/${animal.id}`)}>Editar</button>
              <button onClick={() => handleDelete(animal.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </DashboardContainer>
  );
}
