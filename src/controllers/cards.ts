import BadRequestError from "errors/badRequestError";
import ForbiddenError from "errors/forbiddenError";
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
  const { _id: userId } = req.user.token;
  const { cardId } = req.params;

  Card.findById(cardId)
    .then(card => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }

      const ownerId = card?.owner.toString();

      if (ownerId !== userId) {
        throw new ForbiddenError('Невозможно удалить карточку другого пользователя');
      }

      Card.deleteOne({ _id: card._id }).then(deletedCard => {
        res.status(200).send(deletedCard);
      })
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