import { getUser, getUsers, updateUserAvatar, updateUserProfile, getActiveUser } from "controllers/users";
import { Router } from "express";
import { celebrate, Joi } from "celebrate";
import { avatarRegExp } from "constants/regExps";

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/me', getActiveUser);

usersRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  })
}), getUser);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().regex(avatarRegExp),
  })
}), updateUserProfile);

usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(avatarRegExp),
  })
}), updateUserAvatar);

export default usersRouter;