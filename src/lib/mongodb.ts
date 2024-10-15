import { MongoClient } from 'mongodb';

// Obtem a string de conexão a partir das variáveis de ambiente
const uri = process.env.MONGODB_URI;

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


export default clientPromise;
