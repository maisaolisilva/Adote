import mongoose, { Schema, model, models } from 'mongoose';
import bcrypt from 'bcryptjs';

// Interface para tipar o utilizador
interface IUser extends mongoose.Document {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  birthDate: Date;
  address: string;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

// Esquema do utilizador
const userSchema = new Schema<IUser>({
  fullName: {
    type: String,
    required: [true, 'Nome completo é obrigatório'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    trim: true,
    match: [/.+@.+\..+/, 'Por favor, insira um email válido'],
  },
  phone: {
    type: String,
    required: [true, 'Número de telefone é obrigatório'],
    match: [/^\d{10,11}$/, 'Número de telefone inválido'], // Valida telefone com 10 ou 11 dígitos
  },
  password: {
    type: String,
    required: [true, 'Senha é obrigatória'],
    minlength: [6, 'A senha deve ter no mínimo 6 caracteres'],
  },
  birthDate: {
    type: Date,
    required: [true, 'Data de nascimento é obrigatória'],
    validate: {
      validator: function (value: Date) {
        // Valida se o utilizador tem 18 anos ou mais
        const today = new Date();
        const birthDate = new Date(value);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          return age - 1 >= 18;
        }
        return age >= 18;
      },
      message: 'O utilizador deve ter pelo menos 18 anos',
    },
  },
  address: {
    type: String,
    required: [true, 'Endereço é obrigatório'],
  },
});

// Função para hash da senha antes de salvar o utilizador no banco de dados
userSchema.pre('save', async function (next) {
  const user = this as IUser;

  // Se a senha não foi modificada, não faz hash novamente
  if (!user.isModified('password')) {
    return next();
  }

  // Faz hash da senha
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

// Método para comparar senha durante o login
userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Verifica se o modelo já foi definido, se não, cria o modelo de utilizador
const User = models.User || model<IUser>('User', userSchema);

export default User;
