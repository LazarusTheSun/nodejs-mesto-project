import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

import usersRouter from 'routes/users';
import cardsRouter from 'routes/cards';
import NotFoundError from 'errors/notFoundError';

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
  // @ts-expect-error temporary solution - check todo above
  req.user = {
    _id: '67536bea309a74f2f05a614f',
  };

  next();
})

// routes
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// non-existing routes handler
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  return next(new NotFoundError('Запрашиваемый путь не существует'));
})

// error middleware
// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use((err: any, req: Request, res: Response) => {
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