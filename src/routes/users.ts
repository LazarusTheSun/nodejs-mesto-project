import { getUser, getUsers, updateUserAvatar, updateUserProfile } from "controllers/users";
import { Router } from "express";

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUser);
usersRouter.patch('/me', updateUserProfile);
usersRouter.patch('/me/avatar', updateUserAvatar);

export default usersRouter;