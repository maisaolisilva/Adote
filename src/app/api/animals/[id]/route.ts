import { NextResponse } from 'next/server';
import Animal from '@/models/Animal';
import { dbConnect } from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import mongoose from 'mongoose';

interface AnimalDocument {
    _id: mongoose.Types.ObjectId; // Sempre armazenado como ObjectId no MongoDB
    id?: string; // Transformado para string ao ser retornado
    user: mongoose.Types.ObjectId;
    story: string;
    approximateAge: string;
    size: string;
    dewormed: boolean;
    vaccinated: boolean;
    behavior: string;
    contact: string;
    gender: string;
    imageUrl: string;
  }

//endpoint de busca dos dados de um animal específico
export async function GET(request: Request, { params }: { params: { id: string } }) {
    await dbConnect();
  
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'ID inválido.' }, { status: 400 });
    }
    
  
    try {
      const animal = await Animal.findById(new mongoose.Types.ObjectId(id)).lean<AnimalDocument>();
      if (!animal) {
        return NextResponse.json({ message: 'Animal não encontrado' }, { status: 404 });
      }
  
      return NextResponse.json({
        ...animal,
        id: animal._id.toString(), // Converte o ObjectId para string
        _id: undefined, // Remove o campo original
      }, { status: 200 });
    } catch (error) {
      console.error('Erro ao buscar o animal:', error);
      return NextResponse.json({ message: 'Erro ao buscar o animal' }, { status: 500 });
    }
  }

  //endpoint de delete para os animais cadastrados
export async function DELETE(request: Request, { params }: { params: {id: string}}) {
    await dbConnect();
  
    //Verifica se o usuário está logado
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: 'Não autenticado.' }, { status: 401 });
    }
    
    //pega o id da url fornecida
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'ID inválido.' }, { status: 400 });
    }
    
  
    //tenta buscar o animal no mongodb e lê seus dados
    try {
      const animal = await Animal.findById(new mongoose.Types.ObjectId(id)).lean<AnimalDocument>();
      if (!animal) {
        return NextResponse.json({ message: 'Animal não encontrado' }, { status: 404 });
      }
  
      //Verifica se o usuário que está tentando apagar o animal é o mesmo que o cadastrou
      if (animal.user.toString() !== session.user.id) {
        return NextResponse.json({ message: 'Ação não permitida.' }, { status: 403 });
      }
  
      //Delete do animal
      await Animal.findByIdAndDelete(new mongoose.Types.ObjectId(id));
  
      return NextResponse.json({ message: 'Animal removido com sucesso.' }, { status: 200 });
      
    } catch (error) {
      console.error('Erro ao excluir animal:', error);
      return NextResponse.json({ message: 'Erro ao excluir animal.' }, { status: 500 });
    }
  }

  //endpoint para atualizar dados de um animal
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    await dbConnect();
  
    const { id } = params;
  
    // Verifica se o usuário está autenticado
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: 'Não autenticado.' }, { status: 401 });
    }
  
    try {
      const body = await request.json();
      const { imageUrl, story, approximateAge, size, dewormed, vaccinated, gender, behavior, contact } = body;
  
      // Verifica se todos os campos obrigatórios estão preenchidos
      if (!story || !approximateAge || !size || !gender || !behavior || !contact) {
        return NextResponse.json({ message: 'Campos obrigatórios não preenchidos.' }, { status: 400 });
      }
  
      // Busca o animal pelo ID e verifica se ele existe
      const animal = await Animal.findById(new mongoose.Types.ObjectId(id));
      if (!animal) {
        return NextResponse.json({ message: 'Animal não encontrado.' }, { status: 404 });
      }
  
      // Verifica se o usuário que está tentando atualizar é o dono do animal
      if (animal.user.toString() !== session.user.id) {
        return NextResponse.json({ message: 'Ação não permitida.' }, { status: 403 });
      }
  
      // Atualiza os dados do animal
      const updatedAnimal = await Animal.findByIdAndUpdate(
        id,
        {
          imageUrl,
          story,
          approximateAge,
          size,
          dewormed,
          vaccinated,
          gender,
          behavior,
          contact,
        },
        { new: true } // Retorna o animal atualizado
      );
  
      return NextResponse.json({ message: 'Animal atualizado com sucesso!', animal: updatedAnimal }, { status: 200 });
    } catch (error) {
      console.error('Erro ao atualizar animal:', error);
      return NextResponse.json({ message: 'Erro ao atualizar animal.' }, { status: 500 });
    }
}