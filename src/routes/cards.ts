import { Router } from "express";
import { getCards, createCard, deleteCard } from 'controllers/cards';

const cardsRouter = Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:cardId', deleteCard);

export default cardsRouter;