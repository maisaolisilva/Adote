import { IAnimal } from '@/app/interfaces/IAnimal';

export type Action =
  | { type: 'SET_ANIMALS'; payload: IAnimal[] }
  | { type: 'ADD_ANIMAL'; payload: IAnimal }
  | { type: 'UPDATE_ANIMAL'; payload: IAnimal }
  | { type: 'REMOVE_ANIMAL'; payload: string | undefined }; //recebe um id no payload

export const animalsReducer = (state: IAnimal[], action: Action): IAnimal[] => {
  switch (action.type) {
    case 'SET_ANIMALS': //simplesmente o contexto animals tem como valor os dados retornados (payload é a lista com todos os animais)
      return action.payload;
    case 'ADD_ANIMAL':
      return [...state, action.payload]; // desestrutura a lista e adiciona um objeto animal nela
    case 'UPDATE_ANIMAL':
      return state.map((animal) =>
        animal.id === action.payload.id ? action.payload : animal 
      //passa por cada animal e compara o id do animal que recepe no payload
      //se o id for igual, substitui o animal da lista pelo recebido no payload
      //se os id forem diferentes, apenas retorna (devolve) o animal da lista da forma como está 
      );
    case 'REMOVE_ANIMAL':
        //Recebe o id do animal a ser deleltado
        //Filtra para que apenas os animais com o id diferente do recebido pelo payload estejam na lista
      return state.filter((animal) => animal.id !== action.payload);
    default:
      throw new Error(`Ação desconhecida`);
  }
};
