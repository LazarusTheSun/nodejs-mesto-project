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
      res.status(404).send('Пользователя с таким id не найдено');
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