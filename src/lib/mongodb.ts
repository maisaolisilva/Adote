import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

// Obtem a string de conexão a partir das variáveis de ambiente
const uri = process.env.MONGODB_URI as string;

// Verifica se a variável de ambiente foi definida
if (!uri) {
  throw new Error('Por favor, defina a variável de ambiente MONGODB_URI no arquivo .env.local');
}

//opções adicionais para acriação do client mongodb
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // Em desenvolvimento, usa uma instância global para evitar reconexões frequentes
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Em produção, cria uma nova instância de cliente em cada conexão
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

let isConnected = false; // Verifica o status da conexão
// esta função (dbConnec) foi criada para forçar a conexão com o banco de dados na função authorize [...nextauth]
// estava dando erro na autorização pois a comparação de credenciais acabava sendo realizada antes da conexão com o banco de fato acontecer
export async function dbConnect() {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(uri);
    isConnected = !!db.connections[0].readyState;
    console.log("MongoDB conectado com sucesso.");
  } catch (error) {
    console.error("Erro na conexão com MongoDB:", error);
    throw new Error("Erro na conexão com o MongoDB");
  }
}

export default clientPromise;
