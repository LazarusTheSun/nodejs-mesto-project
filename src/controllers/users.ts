import BadRequestError from "errors/badRequestError";
import NotFoundError from "errors/notFoundError";
import { NextFunction, Request, Response } from "express";
import User from 'models/user';
import bcrypt from 'bcrypt';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then(users => {
      res.status(200).send(users);
    })
    .catch(next);
}

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  User.findById(userId)
    .then(user => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }

      res.status(200).send(user);
    })
    .catch(next);
}

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar, email, password } = req.body;

  if (!(email && password)) {
    return next(new BadRequestError("Не указаны почта и пароль"));
  }

  bcrypt.hash(password, 10).then(hashedPassword => {
    User.create({ name, about, avatar, email, password: hashedPassword })
    .then(user => {
      res.status(201).send(user);
    })
    .catch(next);
  })
}

export const updateUserProfile = (req: Request, res: Response, next: NextFunction) => {
  // @TODO: change hardcoded user to requested from db
  const { _id: userId } = req.user;
  const { name, about, avatar } = req.body;

  // for values that are passed but empty
  Object.values(req.body).forEach(value => {
    if (!value) {
      throw new BadRequestError();
    }
  })

  User.findByIdAndUpdate(userId, { name, about, avatar }, { new: true })
    .then(user => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }

      res.status(200).send(user);
    })
    .catch(next);
}

export const updateUserAvatar = (req: Request, res: Response, next: NextFunction) => {
  // @TODO: change hardcoded user to requested from db
  const { _id: userId } = req.user;
  const { avatar } = req.body;

  if (!avatar) {
    return next(new BadRequestError());
  }

  User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .then(user => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }

      res.status(200).send(user);
    })
    .catch(next);
}