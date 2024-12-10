import BadRequestError from "errors/badRequestError";
import NotFoundError from "errors/notFoundError";
import { NextFunction, Request, Response } from "express";
import Card from "models/card";


export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .then(cards => {
      res.status(200).send(cards);
    })
    .catch(next);
};

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { _id: userId } = req.user.token;
  const { name, link } = req.body;

  if (!(name && link)) {
    next(new BadRequestError());
  }

  Card.create({
    owner: userId,
    name: name,
    link: link,
  })
    .then(card => {
      res.status(201).send(card);
    })
    .catch(next);
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .then(card => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }

      res.status(200).send(card);
    })
    .catch(next);
};

export const likeCard = (req: Request, res: Response, next: NextFunction) => {
  const { _id: userId } = req.user.token;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { "$addToSet": { likes: userId } },
    { new: true }
  )
    .then(card => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }

      res.status(200).send(card);
    })
    .catch(next);
}

export const dislikeCard = (req: Request, res: Response, next: NextFunction) => {
  const { _id: userId } = req.user.token;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { "$pull": { likes: userId } },
    { new: true }
  )
    .then(card => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }

      res.status(200).send(card);
    })
    .catch(next);
}