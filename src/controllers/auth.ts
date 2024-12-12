import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt';
import BadRequestError from "errors/badRequestError";
import UnauthorizedError from "errors/unuthorizedError";
import User, { IUser } from 'models/user';
import jwt from 'jsonwebtoken';
import ConflictError from "errors/conflictError";
import dotenv from "dotenv";

dotenv.config();

const { SECRET_KEY = '' } = process.env;

export const signUp = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar, email, password } = req.body;

  if (!(email && password)) {
    return next(new BadRequestError("Не указаны почта и/или пароль"));
  }

  bcrypt.hash(password, 10).then(hashedPassword => {
    User.create({ name, about, avatar, email, password: hashedPassword })
      .then((user) => {
        const userObj = user.toObject() as Partial<IUser>;
        delete userObj?.password;

        res.status(201).send(userObj);
      })
      .catch(err => {
        if (err.code === 11000) {
          return next(new ConflictError("Пользователь с указанным email уже существует"))
        }

        return next(err);
      });
  })
}

export const signIn = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return next(new BadRequestError("Не указаны почта и/или пароль"));
  }

  User.findOne({ email }).select('+password')
    .then(user => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then(passwordsMatched => {
          if (!passwordsMatched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }

          const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' });

          res.status(200).send({ token });
        })
        .catch(next);
    })
    .catch(next);
}