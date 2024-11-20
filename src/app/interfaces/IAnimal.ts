import mongoose from 'mongoose';
export interface IAnimal {
    _id: mongoose.Types.ObjectId;
    id?: string;
    imageUrl: string;
    story: string;
    approximateAge: string;
    gender: string;
    size: string;
    vaccinated: boolean;
    dewormed: boolean;
    behavior: string;
    contact: string;
    type: string;
    postdAt: Date;
    user: mongoose.Types.ObjectId | string;
  }