import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Animal from '@/models/Animal';


export async function GET(request: Request) {
    await dbConnect();

    try {
        const  animals = await Animal.find()
        return NextResponse.json(
                animals.map(animal =>({ ...animal, 
                    id: animal._id.toString(), 
                    _id: undefined})),
                { status: 200, })
    } catch (error) {
        console.error('Erro ao buscar animais: ', error)
        return NextResponse.json({ message: 'Erro ao buscar animais.' }, { status: 500 })
    }

}