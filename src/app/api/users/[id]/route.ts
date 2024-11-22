import { NextResponse } from 'next/server';
import User from '@/models/User';
import { dbConnect } from '@/lib/mongodb';
import mongoose from 'mongoose';  

//Busca os dados cadastrados 
export async function GET(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;

 
  // Validação do ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'ID inválido.' }, { status: 400 });
  }

  try {
    const user = await User.findById(new mongoose.Types.ObjectId(id)).lean();
    if (!user) {
      return NextResponse.json({ message: 'Usuário não encontrado.' }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return NextResponse.json({ message: 'Erro ao buscar usuário.' }, { status: 500 });
  }
}

//Requisição para atualização dos dados cadastrados
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;
  const userData = await request.json();

  try {
    //desestruturação para separar a url da imagem do resto dos dados, assim a imagem pode ser trabalhada separadamente
    const { profileImageUrl, ...restUserData } = userData;

    //Atualiza os dados no banco de dados 
    const updatedUser = await User.findByIdAndUpdate(
      new mongoose.Types.ObjectId(id), 
      //atualiza a url apenas se o valor estiver definido, evitando salvar valores nulos ou indefinidos
      { ...restUserData, ...(profileImageUrl && { profileImageUrl }) },
      { new: true });

    if (!updatedUser) {
      return NextResponse.json({ message: 'Usuário não encontrado.' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Perfil atualizado com sucesso!' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao atualizar perfil.' }, { status: 500 });
  }
}
