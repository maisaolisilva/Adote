import { MongoClient } from 'mongodb';

declare global {
  // Adiciona _mongoClientPromise ao tipo global
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Isso é necessário para evitar erros de duplicação de declarações
export {};
