import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Faz uma simples consulta para obter coleções no banco de dados
    const collections = await db.listCollections().toArray();

    // Retorna uma resposta JSON com sucesso e os dados das coleções
    return NextResponse.json({ message: 'Conexão bem-sucedida!', collections });
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB', error);

    // Verifica se o `error` é uma instância de `Error` e acessa `message` de forma segura
    if (error instanceof Error) {
      return NextResponse.json({ message: 'Erro ao conectar ao MongoDB', error: error.message }, { status: 500 });
    } else {
      // Caso o `error` não tenha a propriedade `message`, retorna o erro como string
      return NextResponse.json({ message: 'Erro ao conectar ao MongoDB', error: String(error) }, { status: 500 });
    }
  }
}
