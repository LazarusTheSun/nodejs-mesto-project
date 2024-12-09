import { Schema, model } from "mongoose";
import validator from 'validator';

interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

const USER_DEFAULT_DATA: Pick<IUser, 'name' | 'avatar' | 'about'> = {
  name: "Жак-Ив Кусто",
  about: "Исследователь",
  avatar: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: USER_DEFAULT_DATA.name,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: USER_DEFAULT_DATA.about,
  },
  avatar: {
    type: String,
    default: USER_DEFAULT_DATA.avatar,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email: string) => validator.isEmail(email),
      message: 'Неправильный формат почты'
    }
  },
  password: {
    type: String,
    required: true,
  }
})

export default model<IUser>('user', UserSchema);