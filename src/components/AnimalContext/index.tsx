'use client'

import { IAnimal } from '@/app/interfaces/IAnimal';
import { useSession } from 'next-auth/react';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AnimalsContextData {
    animals: IAnimal[];
    setAnimals: React.Dispatch<React.SetStateAction<IAnimal[]>>;
}

const AnimalContext = createContext<AnimalsContextData | undefined>(undefined);

//Provedor
 export const AnimalsProvider = ({ children }: { children: ReactNode}) => {
    const [animals, setAnimals] = useState<IAnimal[]>([]);
    const {data: session, status} = useSession();

    return (
        <AnimalContext.Provider value={{ animals, setAnimals }}>
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