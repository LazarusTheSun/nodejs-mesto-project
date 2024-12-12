import NotFoundError from "errors/notFoundError";
import { NextFunction, Request, Response } from "express";
import User from 'models/user';

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

export const updateUserProfile = (req: Request, res: Response, next: NextFunction) => {
  const { _id: userId } = req.user.token;
  const { name, about, avatar } = req.body;

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
  const { _id: userId } = req.user.token;
  const { avatar } = req.body;

  User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .then(user => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }

      console.log()

      res.status(200).send(user);
    })
    .catch(next);
}

export const getActiveUser = (req: Request, res: Response, next: NextFunction) => {
  const { _id: userId } = req.user.token;

  User.findById(userId)
    .then(user => {
      if (!user) {
        return next(new NotFoundError('Пользователь не найден'))
      }

      res.status(200).send(user);
    })
    .catch(next);
}