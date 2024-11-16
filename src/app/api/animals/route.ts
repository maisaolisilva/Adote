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
  const { imageUrl, story, approximateAge, size, dewormed, vaccinated, gender, behavior, contact } = body;

  if (!imageUrl || !story || !approximateAge || !size || !gender || !behavior || !contact) {
    return NextResponse.json({ message: 'Preencha os campos obrigatérios.' }, { status: 400 });
  }

  //tenta cadastrar o animal com as informações do corpo da requisição
  try {
    const animal = await Animal.create({
      imageUrl,
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

//endpoint de delete para os animais que forem adotados
export async function DELETE(request: Request) {
  await dbConnect();

  //Verifica se o usuário está logado
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Não autenticado.' }, { status: 401 });
  }

  //Pega o id do animal na url
  const url = new URL(request.url);
  const animalId = url.searchParams.get('id');

  if (!animalId) {
    return NextResponse.json({ message: 'ID do animal não fornecido.' }, { status: 400 });
  }

  try {
    const animal = await Animal.findById(animalId);

    if (!animal) {
      return NextResponse.json({ message: 'Animal não encontrado.' }, { status: 404 });
    }

    //Verifica se o usuário que está tentando apagar o animal é o mesmo que o cadastrou
    if (animal.user.toString() !== session.user.id) {
      return NextResponse.json({ message: 'Ação não permitida.' }, { status: 403 });
    }

    //Delete do animal
    await Animal.findByIdAndDelete(animalId);

    return NextResponse.json({ message: 'Animal removido com sucesso.' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao excluir animal:', error);
    return NextResponse.json({ message: 'Erro ao excluir animal.' }, { status: 500 });
  }
}
