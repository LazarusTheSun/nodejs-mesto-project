import { Request, Response } from "express";
import Card from "models/card";


export const getCards = (req: Request, res: Response) => {
  Card.find({})
    .then(cards => {
      res.status(200).send(cards);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

export const createCard = (req: Request, res: Response) => {
  // @ts-ignore
  const { _id: userId } = req.user;
  const { name, link } = req.body;

  Card.create({
    owner: userId,
    name: name,
    link: link,
  })
  .then(card => {
    res.status(201).send(card);
  })
  .catch(err => {
    res.status(400).send(err);
  });
};

export const deleteCard = (req: Request, res: Response) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .then(card => {
      res.status(200).send(card);
    })
    .catch(err => {
      res.status(500).send(err);
    })
};