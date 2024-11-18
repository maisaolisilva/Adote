'use client';
import Titulo from "@/components/Titulo";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from 'next/image';
import styled from "styled-components";
import { AvatarUploader } from "@/components/AvatarUpload";

const AnimalContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
    max-width: 600px;
    text-align: center;
    margin: 10px 0;
    input{
        border: 2px solid #624E88;
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
    .select {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 20px;
      margin: 20px 0;
      select{
        border: 2px solid #624E88;
        border-radius: 20px;
        width: 100px;
        color: #624E88;
        font-size: 16px;
        padding: 3px;
        margin-left: 5px;
      }
    }
`;

export default function EditAnimalPage(){
    const { data: session, status } = useSession();
    const router = useRouter();
    const params = useParams();
    const [animalData, setAnimalData] = useState({
        story: '',
        approximateAge: '',
        size: '',
        dewormed: false,
        vaccinated: false,
        behavior: '',
        contact: '',
        gender: '',
        imageUrl: '',
    })

     // Redireciona se não autenticado
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  //busca dados do animal pelo id:
  useEffect(() => {
    async function fetchAnimalData() {
      try {
        const response = await fetch(`/api/animals/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setAnimalData(data);
        } else {
          console.error("Animal não encontrado ou erro na API");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do animal:", error);
      }
    }
    if (status === 'authenticated' && session?.user?.id) {
      fetchAnimalData();
    }
  }, [status, session, params.id]);

  //Altera os dados armazenados ao alterar os valores dos input e select:
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    setAnimalData((prevData) => ({
      ...prevData,
      [name]: 
        name === 'dewormed' || name === 'vaccinated' 
          ? value === 'true' 
          : value,
    }));
  };
  
  //Atualiza os dados do animal
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/animals/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(animalData),
      });
      if (response.ok) {
        alert('Perfil atualizado com sucesso!');
        router.push('/dashboard'); // Redireciona para o dashboard
      } else {
        alert('Erro ao atualizar perfil.');
      }
    } catch (error) {
      console.error("Erro ao enviar dados: ", error)
    }
  };

  return(
    <AnimalContainer>
        <Titulo> Edite seu post </Titulo>
        {animalData.imageUrl && 
            (<Image
                src={animalData.imageUrl}
                alt="Foto do Animal"
                width={150}
                height={150}
                style={{ borderRadius: '50%' }}
            />)
        }
        <AvatarUploader
            onUploadSuccess={(url)=>
                setAnimalData((prev) => ({ ...prev, imageUrl: url }))
            }
        />

      <form onSubmit={handleSubmit}>
        <label>
          História do animal:
          <input
            type="text"
            name="story"
            value={animalData.story}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Idade aproximada:
          <input
            type="text"
            name="approximateAge"
            value={animalData.approximateAge}
            onChange={handleInputChange}
            required
          />
        </label>
        <div className="select">
          <label>
            Porte:
            <select value={animalData.size} name="size" onChange={handleInputChange}>
              <option value="Pequeno">Pequeno</option>
              <option value="Médio">Médio</option>
              <option value="Grande">Grande</option>
            </select>
          </label>
          <label>
            Vermifugado:
            <select value={animalData.dewormed ? 'true' : 'false'} name="dewormed" onChange={handleInputChange}>
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>
          </label>
          <label>
            Vacinado:
            <select value={animalData.vaccinated ? 'true' : 'false'} name="vaccinated" onChange={handleInputChange}>
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>
          </label>
          <label>
            Gênero:
            <select value={animalData.gender} name="gender" onChange={handleInputChange}>
              <option value="Fêmea">Fêmea</option>
              <option value="Macho">Macho</option>
            </select>
          </label>
        </div>
        <label>
          Comportamento:
          <input
            type="text"
            name="behavior"
            value={animalData.behavior}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Contato para interessados:
          <input
            type="text"
            name="contact"
            value={animalData.contact}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Salvar Alterações</button>
      </form>
    </AnimalContainer>
    )
}

