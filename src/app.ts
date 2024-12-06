import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

import usersRouter from 'routes/users';

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
app.use((req: Request, res: Response, next: NextFunction) => {
  //@ts-ignore
  req.user = {
    _id: '67534288c5a807c679148429',
  };

  next();
})

// routes
app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})