import BadRequestError from "errors/badRequestError";
import NotFoundError from "errors/notFoundError";
import { NextFunction, Request, Response } from "express";
import User from 'models/user';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then(users => {
      res.status(201).send(users);
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
  const { name, about, avatar } = req.body;

  if (!(name && about && avatar)) {
    next(new BadRequestError());
  }

  User.create({ name, about, avatar })
    .then(user => {
      res.status(201).send(user);
    })
    .catch(next);
}

export const updateUserProfile = (req: Request, res: Response, next: NextFunction) => {
  // @TODO: change hardcoded user to requested from db
  // @ts-ignore
  const { _id: userId } = req.user;
  const { name, about, avatar } = req.body;

  if (!(name && about && avatar)) {
    return next(new BadRequestError());
  }

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
  // @ts-ignore
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