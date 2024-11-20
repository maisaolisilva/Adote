'use client';

import Titulo from "@/components/Titulo";
import styled from "styled-components";
import { format } from 'date-fns';
import Image from "next/image";
import { useEffect, useState } from "react";
import { IAnimal } from "@/app/interfaces/IAnimal";
import { useParams } from "next/navigation";

const AnimalContainer = styled.section`
    margin-top: 10px;
    height: 100%;
    font-size: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .animal{
        margin-top: 5px;
        border: 3px solid #624E88;
        padding: 10px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p{
            margin-top: 2px;
        }
    }

`

export default function Animal() {
    const [animal, setAnimal] = useState<IAnimal | null>(null);
    const { id } = useParams() as { id: string };

    //acessa a API para exibir todos os dados do animal selecionado
    useEffect(() => {
        async function fetchAnimal() {
            const animal = await fetch(`/api/animals/${id}`);
            if (animal.ok) {
                const data = await animal.json();
                setAnimal(data);
            } else {
                console.error('Erro ao buscar o animal.')
            }
        }
        fetchAnimal();
    }, [])

    return(
        <AnimalContainer>
            <Titulo>Detalhes do animal</Titulo>
            { animal ? (
                <div className="animal">
                    <Image src={animal.imageUrl} alt="Imagem do animal" width={300} height={300} />
                        <div className="detalhes">
                            <p>Tipo: {animal.type}</p>
                            <p>História: {animal.story} Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid earum enim vel aperiam iusto error explicabo? Suscipit at illum maxime asperiores nobis sit aliquam? Earum nulla sunt quisquam omnis laboriosam.</p>
                            <p>Idade Aproximada: {animal.approximateAge}</p>
                            <p>Gênero: {animal.gender}</p>
                            <p>Porte: {animal.size}</p>
                            <p>Vacinado: {animal.vaccinated ? 'Sim' : 'Não'}</p>
                            <p>Vermifugado: {animal.dewormed ? 'Sim' : 'Não'}</p>
                            <p>Comportamento: {animal.behavior}</p>
                            <p>Contato: {animal.contact}</p>
                            <p>Postado em: {format(new Date(animal.postdAt), 'dd/MM/yyyy')}</p>
                        </div>
                </div>) : 
                    (<p>Carregando ...</p>)
                }
                    
        </AnimalContainer>
    )
}