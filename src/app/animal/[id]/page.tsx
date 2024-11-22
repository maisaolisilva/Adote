'use client';

import Titulo from "@/components/Titulo";
import styled from "styled-components";
import { format } from 'date-fns';
import Image from "next/image";
import { useEffect, useState } from "react";
import { IAnimal } from "@/app/interfaces/IAnimal";
import { useParams } from "next/navigation";
import { IUser } from "@/app/interfaces/IUser";

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
        .detalhes{
            width: 100%;
        }
    }
    .usuario{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 5px;
    }

`

export default function Animal() {
    //Coloquei o opção de ser null para evitar erro em caso de demora para o recebimento dos dados
    const [animal, setAnimal] = useState<IAnimal | null>(null);
    const [user, setUser] = useState<IUser | null>(null);

    const { id } = useParams() as { id: string };

    //acessa a API para exibir todos os dados do animal selecionado e o usuário que o postou 
   useEffect(() => {
    async function fetchAnimalAndUser() {
        try {
            // Busca os dados do animal
            const animalResponse = await fetch(`/api/animals/${id}`);
            if (animalResponse.ok) {
                const animalData = await animalResponse.json();
                setAnimal(animalData);

                // Busca os dados do usuário que postou o animal
                const userResponse = await fetch(`/api/users/${animalData.user}`);
                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    setUser(userData);
                } else {
                    console.error('Erro ao buscar o usuário.');
                }
            } else {
                console.error('Erro ao buscar o animal.');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    }

    fetchAnimalAndUser();
    
}, [id]);

return (
    <AnimalContainer>
        <Titulo>Detalhes do animal</Titulo>
        {animal ? (
            <div className="animal">
                <Image src={animal.imageUrl} alt="Imagem do animal" width={300} height={300} />
                <div className="detalhes">
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
                {user && (
                    <div className="usuario">
                        <h3>Postado por:</h3>
                        <Image src={user.profileImageUrl} alt={`Foto de ${user.fullName}`} width={100} height={100} style={{ borderRadius: '50%' }} />
                        <p>{user.fullName}</p>
                    </div>
                )}
            </div>
        ) : (
            <p>Carregando...</p>
        )}
    </AnimalContainer>
);

}