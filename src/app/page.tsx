'use client';

import styled from "styled-components";
import Titulo from "@/components/Titulo";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IAnimal } from "./interfaces/IAnimal";
import Link from "next/link";

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
  
`

export default function Home() {
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const router = useRouter();

  //acessa a API da home para exibis os animais cadastrados
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await fetch('/api/home', {
          headers: {
            'Cache-Control': 'no-store',
          },
        });
  
        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
          throw new Error(`Erro na API: ${response.statusText}`);
        }
  
        // Verifica se a resposta tem conteúdo antes de tentar transformá-la em JSON
        const data = await response.json();
        setAnimals(data);
      } catch (error) {
        console.error('Erro ao buscar animais:', error);
      }
    };
  
    fetchAnimals(); // Busca inicial
  
    const interval = setInterval(fetchAnimals, 10000);
  
    return () => clearInterval(interval);
  }, []);
  

  return (
    <HomeContainer>
      <Titulo>Animais cadastrados: </Titulo>
        <ul>
        {animals.map((animal) => (
          <li key={animal._id.toString()}>
            <Image src={animal.imageUrl} alt="Imagem do animal" width={250} height={250} style={{ borderRadius: '20%' }}/>
            <div>
              <p>Tipo: {animal.type}</p>
              <p>História: {animal.story}</p>
            </div>
            <Link href={`/animal/${animal._id.toString()}`}>
              Conferir Detalhes
            </Link>
          </li>
        ))}
        </ul>
    </HomeContainer>
  );
}
