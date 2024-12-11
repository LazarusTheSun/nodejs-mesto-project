import { Schema, model } from "mongoose";
import { avatarRegExp } from "constants/regExps";

interface ICard {
  name: string;
  link: string;
  owner: Schema.Types.ObjectId;
  likes: Schema.Types.ObjectId[];
  createdAt: Date;
}

const CardSchema = new Schema<ICard>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator: (avatar: string) => avatarRegExp.test(avatar),
      message: 'Неправильный формат ссылки',
    },
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [Schema.Types.ObjectId],
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

export default model<ICard>('card', CardSchema);