import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Animal from '@/models/Animal';


export async function GET(request: Request) {
    await dbConnect();

     // Extrai o parâmetro timestamp da URL
     const { searchParams } = new URL(request.url);
     const timestamp = searchParams.get('timestamp');

    try {
        const  animals = await Animal.find().lean()
        const formattedAnimals = animals.map((animal) => ({
            ...animal,
            id: animal._id?.toString(), // Converte o ObjectId para string
            _id: undefined, // Remove o campo original para evitar duplicidade
            postedAt: animal.postdAt,
          }));
        return NextResponse.json(formattedAnimals, { status: 200 })
    } catch (error) {
        console.error('Erro ao buscar animais: ', error)
        return NextResponse.json({ message: 'Erro ao buscar animais.' }, { status: 500 })
    }

}