import mongoose, { Schema, model, models } from "mongoose";

//Interface para o modelo de Animal
interface IAnimal extends mongoose.Document {
    imageUrl: string;
    type: string;
    story: string;
    approximateAge: string;
    size: 'Pequeno' | 'Médio' | 'Grande';
    dewormed: boolean;
    vaccinated: boolean;
    gender: 'Macho' | 'Fêmea';
    behavior: string;
    contact: string;
    user: mongoose.Types.ObjectId;
    postdAt: Date;
}

//Modelo Animal
const animalSchema = new Schema<IAnimal>({
    imageUrl: {
        type: String, 
        required: [true, 'A foto é obrigatória'] 
    },
    type: {
        type: String,
        required: [ true,  'É obrigatório informar o tipo do animal']
    },
    story: {
        type: String,
        required: [true, 'É obrigatória apresentar informações sobre como encontrou o animal']
    },
    approximateAge: {
        type: String,
        required: true
    },
    size: {
        type: String,
        enum: ['Pequeno', 'Médio', 'Grande'],
        required: true
    },
    dewormed: {
        type: Boolean
    },
    vaccinated: {
        type: Boolean
    },
    gender: {
        type: String,
        enum: ['Macho', 'Fêmea'],
        required: true
    },
    behavior: {
        type: String,
        required: [true, 'É necessário falar sobre como o animal se comporta (carinhoso, agressivo ...)']
    },
    contact: {
        type: String,
        required: [true, 'É necessário fornecer um meio de contato']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postdAt: {
        type: Date,
        default: Date.now //salva a data do momento da postagem
    }
}, {
    timestamps: true, // Adiciona createdAt e updatedAt automaticamente
})

//Previne redefinições do modelo em ambiente de desenvolvimento
const Animal = models.Animal || model<IAnimal>('Animal', animalSchema);

export default Animal;