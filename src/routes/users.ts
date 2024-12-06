import { createUser, getUser, getUsers } from "controllers/users";
import { Router } from "express";

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUser);
usersRouter.post('/', createUser);

export default usersRouter;