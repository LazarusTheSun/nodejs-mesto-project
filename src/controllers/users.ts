import { Request, Response } from "express";
import User from 'models/user';

export const getUsers = (req: Request, res: Response) => {
  User.find({})
    .then(users => {
      res.status(201).send(users);
    })
    .catch(err => {
      res.status(500).send(err)
    });
}

export const getUser = (req: Request, res: Response) => {
  const { userId } = req.params;

  User.findById(userId)
    .then(user => {
      res.status(200).send(user);
    })
    .catch(err => {
      res.status(404).send(err);
    })
}

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => {
      res.status(201).send(user);
    })
    .catch(err => {
      res.status(400).send(err)
    });
}

export const updateUserProfile = (req: Request, res: Response) => {
  // @TODO: change hardcoded user to requested from db
  // @ts-ignore
  const { _id: userId } = req.user;
  const { name, about, avatar } = req.body;

  User.findByIdAndUpdate(userId)
    .then(user => {
      if (!user) {
        throw new Error('Пользователь не найден');
      }

      res.status(200).send({
        name: name || user.name,
        about: about || user.about,
        avatar: avatar || user.avatar,
      });
    })
    .catch(err => {
      res.status(404).send(err);
    });
}

export const updateUserAvatar = (req: Request, res: Response) => {
  // @TODO: change hardcoded user to requested from db
  // @ts-ignore
  const { _id: userId } = req.user;
  const { avatar } = req.body;

  User.findByIdAndUpdate(userId)
    .then(user => {
      if (!user) {
        throw new Error('Пользователь не найден');
      }

      res.status(200).send({
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: avatar
      });
    })
    .catch(err => {
      res.status(404).send(err);
    });
}