import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

import usersRouter from 'routes/users';
import cardsRouter from 'routes/cards';
import NotFoundError from 'errors/notFoundError';
import { createUser, login } from 'controllers/users';

const { PORT = 3000 } = process.env;

const MONGO_HOST = 'mongodb://127.0.0.1:27017';
const DB_NAME = 'mestodb';

// create server
const app = express();

// db connection
mongoose.connect(`${MONGO_HOST}/${DB_NAME}`);

// parsers
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// middlewares
// @TODO: remove this and requested from db
app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '67536c04309a74f2f05a6151',
  };

  next();
})

// routes
app.post('/signin', login);
app.post('/signup', createUser);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// non-existing routes handler
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  return next(new NotFoundError('Запрашиваемый путь не существует'));
})

// error middleware
app.use((err: Error & { statusCode: number; }, req: Request, res: Response) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message
    });
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});