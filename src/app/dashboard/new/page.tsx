'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Titulo from '@/components/Titulo';
import { AvatarUploader } from '@/components/AvatarUpload'; // Componente para upload da imagem

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  width: 100%;
  max-width: 600px;
  text-align: center;

  input, select {
    border: 2px solid #789DBC;
    width: 100%;
    height: 30px;
    margin: 2px 0 10px 0;
    border-radius: 20px;
    text-align: center;
    font-size: 16px;
  }

  label {
    font-size: 24px;
    color: #624E88;
  }

  button {
    background-color: #624E88;
    border: none;
    padding: 0.5em 2em;
    border-radius: 20px;
    font-size: 24px;
    color: #FEF9F2;
    margin-top: 20px;
    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
`;

export default function NewAnimalPage() {
  const [imageUrl, setImageUrl] = useState(''); // URL da imagem após upload
  const [story, setStory] = useState('');
  const [approximateAge, setApproximateAge] = useState('');
  const [size, setSize] = useState('Pequeno'); 
  const [dewormed, setDewormed] = useState(false);
  const [vaccinated, setVaccinated] = useState(false);
  const [gender, setGender] = useState('Fêmea'); 
  const [behavior, setBehavior] = useState('');
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/animals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl,
          story,
          approximateAge,
          size,
          dewormed,
          vaccinated,
          gender,
          behavior,
          contact,
        }),
      });

      if (response.ok) {
        alert('Animal cadastrado com sucesso!');
        router.push('/dashboard'); // Redireciona ao dashboard
      } else {
        const data = await response.json();
        setError(data.message || 'Erro ao cadastrar animal.');
      }
    } catch (err) {
      console.error('Erro ao enviar dados:', err);
      setError('Erro ao enviar os dados. Tente novamente.');
    }
  };

  return (
    <StyledSection>
      <Titulo>Cadastro de Animal</Titulo>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          História do animal:
          <input
            type="text"
            value={story}
            onChange={(e) => setStory(e.target.value)}
            required
          />
        </label>
        <label>
          Idade aproximada:
          <input
            type="text"
            value={approximateAge}
            onChange={(e) => setApproximateAge(e.target.value)}
            required
          />
        </label>
        <label>
          Porte:
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="Pequeno">Pequeno</option>
            <option value="Médio">Médio</option>
            <option value="Grande">Grande</option>
          </select>
        </label>
        <label>
          Vermifugado:
          <select value={dewormed.toString()} onChange={(e) => setDewormed(e.target.value === 'true')}>
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
        </label>
        <label>
          Vacinado:
          <select value={vaccinated.toString()} onChange={(e) => setVaccinated(e.target.value === 'true')}>
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
        </label>
        <label>
          Gênero:
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="Fêmea">Fêmea</option>
            <option value="Macho">Macho</option>
          </select>
        </label>
        <label>
          Comportamento:
          <input
            type="text"
            value={behavior}
            onChange={(e) => setBehavior(e.target.value)}
            required
          />
        </label>
        <label>
          Contato para interessados:
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </label>
        <label className="uploadImage">
          <div>Foto do Animal:</div>
          <AvatarUploader onUploadSuccess={setImageUrl} />
        </label>
        <button type="submit">Registrar</button>
      </form>
    </StyledSection>
  );
}
