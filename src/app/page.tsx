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
  .botoes{
    
  }
  ul{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 20px;
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

    async function fetchAnimals() {
      const response = await fetch('/api/home');
      if (response.ok) {
        const data = await response.json();
        setAnimals(data);
      } else {
        console.error('Erro ao acessar a api');
      }
    }
    fetchAnimals();
    
  }, [])

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
