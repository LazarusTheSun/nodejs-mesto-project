import { Router } from "express";
import { getCards, createCard, deleteCard, likeCard, dislikeCard } from 'controllers/cards';
import { celebrate, Joi } from "celebrate";
import { avatarRegExp } from "constants/regExps";

const cardsRouter = Router();

cardsRouter.get('/', getCards);

cardsRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(avatarRegExp),
  })
}), createCard);

cardsRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  })
}), deleteCard);

cardsRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  })
}), likeCard);

cardsRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  })
}), dislikeCard);

export default cardsRouter;