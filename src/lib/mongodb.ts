import mongoose from 'mongoose';

// Obtem a string de conexão a partir das variáveis de ambiente
const uri = process.env.MONGODB_URI as string;

// Verifica se a variável de ambiente foi definida
if (!uri) {
  throw new Error('Por favor, defina a variável de ambiente MONGODB_URI no arquivo .env.local');
}

let isConnected = false; // Verifica o status da conexão
export async function dbConnect() {
  if (isConnected) { 
    // Se já estiver conectado, retorna sem fazer nada
    console.log("MongoDB já está conectado.");
    return;
  }

  try {
    const db = await mongoose.connect(uri, 
      {
        bufferCommands: false, // Desativa buffers automáticos em mongoose
      }
    );
    
    isConnected = !!db.connections[0].readyState;
    console.log("MongoDB conectado com sucesso.");

  } catch (error) {
    console.error("Erro na conexão com MongoDB:", error);
    throw new Error("Erro na conexão com o MongoDB");
  }
}

