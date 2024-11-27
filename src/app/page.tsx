'use client';

import styled from "styled-components";
import Titulo from "@/components/Titulo";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAnimals } from "@/components/AnimalContext";

const HomeContainer = styled.section`
  margin: 20px 10px ;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  ul{
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
    justify-content: space-evenly;
    li{
      list-style: none;
      border: solid 2px #624E88;
      border-radius: 20px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 20px;
    }
  }
  a {
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 20px;
      color: #FEF9F2;
      font-size: 18px;
      font-weight: bold;
      background-color: #624E88;
      &:hover {
        opacity: 0.8;
      }
    }
    .update-button {
    padding: 10px;
    border-radius: 10px;
    background-color: #624e88;
    color: #fff;
    font-size: 16px;
    border: none;
    cursor: pointer;

    &.highlight {
      background-color: red;
      animation: blink 1s infinite;
    }
  }

  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }

  .titulo-botao{
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
`

export default function Home() {
  const { state: animals, dispatch } = useAnimals();

  
  // Busca os animais da API para exibição inicial
  useEffect(() => {
    async function fetchAnimals() {
      const response = await fetch(`/api/home?timestamp=${Date.now()}`);
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: 'SET_ANIMALS', payload: data}); // Atualiza o estado global com os dados da API
      } else {
        console.error('Erro ao buscar os animais');
      }
    }
    fetchAnimals();
  }, [dispatch, animals]);
  
  return (
    <HomeContainer>
      
      <Titulo>Animais cadastrados: </Titulo>
      {!animals || animals.length === 0 ? (
        <h2>Animais cadastrados aparecerão aqui</h2>
      ) : (
        <ul>
          {animals.map((animal) => (
            <li key={animal.id}>
              <Image
                src={animal.imageUrl}
                alt="Imagem do animal"
                width={250}
                height={250}
                style={{ borderRadius: '20%' }}
              />
              <div>
                <p>Tipo: {animal.type}</p>
                <p>História: {animal.story}</p>
              </div>
              <Link href={`/animal/${animal.id}`}>Conferir Detalhes</Link>
            </li>
          ))}
        </ul>
      )}
    </HomeContainer>
  );
}


            