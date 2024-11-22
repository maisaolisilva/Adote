import mongoose from 'mongoose';
export interface IUser {
    _id: mongoose.Types.ObjectId;   
    id?: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  birthDate: Date;
  address: string;
  profileImageUrl: string;
  }