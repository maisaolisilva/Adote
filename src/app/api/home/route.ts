import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Animal from '@/models/Animal';


export async function GET(request: Request) {
    await dbConnect();

    try {
        const  animals = await Animal.find().lean()
        const formattedAnimals = animals.map((animal) => ({
            ...animal,
            id: animal._id?.toString(), // Converte o ObjectId para string
            _id: undefined, // Remove o campo original para evitar duplicidade
            postedAt: animal.postdAt,
          }));
        return NextResponse.json(formattedAnimals, { 
            status: 200,
            headers: { 'Cache-Control': 'no-store' }
         })
    } catch (error) {
        console.error('Erro ao buscar animais: ', error)
        return NextResponse.json({ message: 'Erro ao buscar animais.' }, { status: 500 })
    }

}