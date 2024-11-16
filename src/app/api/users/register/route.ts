import { NextResponse } from 'next/server';
import User from '@/models/User'; // Importa o modelo de utilizador
import clientPromise from '@/lib/mongodb'; // Importa a conexão MongoDB
import bcrypt from 'bcryptjs';

//requisição do tipo post para cadastrar um novo usuário
export async function POST(request: Request) {
  
  // Conecta ao MongoDB usando clientPromise
  const client = await clientPromise;
  const db = client.db();

  // Obtém os dados do corpo da requisição
  const body = await request.json();
  const { email, password, nome, endereco, phone, birthDate, profileImageUrl } = body;
  
  console.log("Dados recebidos na API de registro:", { email, password, nome, endereco, phone, birthDate, profileImageUrl });


  // Verifica se todos os campos obrigatórios foram preenchidos
  if (!email || !password || !nome || !endereco || !phone || !birthDate || !profileImageUrl) {
    return NextResponse.json({ message: 'Todos os campos são obrigatórios' }, { status: 400 });
  }

  //Verifica se a senha possui mais que seis caracteres
  if (password.length < 6) {
    return NextResponse.json({ message: 'A senha deve ter no mínimo 6 caracteres' }, { status: 400 });
  }
  

  // Verifica se o email já está registrado
  const existingUser = await db.collection('users').findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: 'Email já está em uso' }, { status: 400 });
  }

  // Cria o hash da senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Verifica a idade do usuário
  const userBirthDate = new Date(birthDate);
  const age = new Date().getFullYear() - userBirthDate.getFullYear();
  if (age < 18) {
    return NextResponse.json({ message: 'O utilizador deve ter pelo menos 18 anos' }, { status: 400 });
  }

  // Cria um novo utilizador
  const user = new User({
    fullName: nome,
    email,
    password: hashedPassword,
    address: endereco,
    phone,
    birthDate: userBirthDate,
    profileImageUrl
  });

  // Salva o utilizador no banco de dados
  await db.collection('users').insertOne(user);

  return NextResponse.json({ message: 'Usuário registrado com sucesso!' }, { status: 201 });
}
