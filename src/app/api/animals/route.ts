import { NextResponse } from 'next/server';
import Animal from '@/models/Animal';
import { dbConnect } from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';


//endpoint de cadastro de animal
export async function POST(request: Request) {
  await dbConnect();

  //Verifica se o usuário está logado para poder cadastrar um animal
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Não autenticado.' }, { status: 401 });
  }

  //corpo da requisição
  const body = await request.json();
  const { imageUrl, type, story, approximateAge, size, dewormed, vaccinated, gender, behavior, contact } = body;

  if (!imageUrl || !story || !type || !approximateAge || !size || !gender || !behavior || !contact) {
    return NextResponse.json({ message: 'Preencha os campos obrigatórios.' }, { status: 400 });
  }

  //tenta cadastrar o animal com as informações do corpo da requisição
  try {
    const animal = await Animal.create({
      imageUrl,
      type,
      story,
      approximateAge,
      size,
      dewormed,
      vaccinated,
      gender,
      behavior,
      contact,
      user: session.user.id,
    });

    return NextResponse.json({ message: 'Animal cadastrado com sucesso!', animal }, { status: 201 });
  } catch (error) {
    console.error('Erro ao cadastrar animal:', error);
    return NextResponse.json({ message: 'Erro ao cadastrar animal.' }, { status: 500 });
  }
}


