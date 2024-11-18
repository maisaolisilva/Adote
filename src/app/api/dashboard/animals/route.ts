import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Animal from '@/models/Animal';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import mongoose from 'mongoose';

//endpoint para buscar todos os animais cadastrados por um usuário específico
export async function GET(request: Request) {
  await dbConnect();

  // Obtém a sessão para verificar o usuário autenticado
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ message: 'Usuário não autenticado' }, { status: 401 });
  }

  const userId = new mongoose.Types.ObjectId(session.user.id);

  try {
    const animals = await Animal.find({ user: userId }).lean();
    const formattedAnimals = animals.map((animal) => ({
      ...animal,
      id: animal._id?.toString(), // Converte o ObjectId para string
      _id: undefined, // Remove o campo original para evitar duplicidade
      postedAt: animal.postdAt,
    }));

    return NextResponse.json(formattedAnimals, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar animais do usuário:', error);
    return NextResponse.json({ message: 'Erro ao buscar animais' }, { status: 500 });
  }
}
