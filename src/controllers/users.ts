import BadRequestError from "errors/badRequestError";
import NotFoundError from "errors/notFoundError";
import UnauthorizedError from 'errors/unuthorizedError';
import { NextFunction, Request, Response } from "express";
import User from 'models/user';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

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
  const { _id: userId } = req.user.token;
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
  const { _id: userId } = req.user.token;
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

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return next(new BadRequestError("Не указаны почта и/или пароль"));
  }

  User.findOne({ email })
    .then(user => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }

      bcrypt.compare(password, user.password).then(passwordsMatched => {
        if (!passwordsMatched) {
          throw new UnauthorizedError('Неправильные почта или пароль');
        }

        const token = jwt.sign({ _id: user._id }, 'secret-key', { expiresIn: '7d' });

        res.status(200).send({ token });
      })
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