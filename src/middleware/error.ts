import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (err: Error & { statusCode: number; }, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      status: 'error',
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message
    });

  next();
};

export default errorMiddleware;