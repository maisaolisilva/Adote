'use client'

import { IAnimal } from '@/app/interfaces/IAnimal';
import { Action, animalsReducer } from '@/app/reduces/animalsReducer';
import React, { createContext, useReducer, useContext, ReactNode } from 'react';

interface AnimalsContextData {
    state: IAnimal[];
    dispatch: React.Dispatch<Action>;
}

const AnimalContext = createContext<AnimalsContextData | undefined>(undefined);

//Provedor
 export const AnimalsProvider = ({ children }: { children: ReactNode}) => {
    const [state, dispatch] = useReducer(animalsReducer,[]);

    return (
        <AnimalContext.Provider value={{ state, dispatch }}>
            { children }
        </AnimalContext.Provider>
    )
 };

// Hook para acessar o contexto de animais
export const useAnimals = () => {
    const context = useContext(AnimalContext);
    if (!context) {
        throw new Error('useAnimals deve ser usado dentro de um AnimalsProvider');
    }
    return context;
}