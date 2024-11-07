import { NextResponse } from 'next/server';
import User from '@/models/User';
import { dbConnect } from '@/lib/mongodb';
import mongoose from 'mongoose';  

//Busca os dados cadastrados 
export async function GET(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;

  try {
    const user = await User.findById(id).lean();
    if (!user) {
      return NextResponse.json({ message: 'Usuário não encontrado.' }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
      return NextResponse.json({ message: 'Erro ao buscar usuário.' }, { status: 500 });
  }
}

//Requisição para atualização dos dados cadastrados
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;
  const userData = await request.json();

  try {
    const updatedUser = await User.findByIdAndUpdate(new mongoose.Types.ObjectId(id), userData, { new: true });
    if (!updatedUser) {
      return NextResponse.json({ message: 'Usuário não encontrado.' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Perfil atualizado com sucesso!' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao atualizar perfil.' }, { status: 500 });
  }
}
