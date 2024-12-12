import UnauthorizedError from "errors/unuthorizedError";
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const { SECRET_KEY = '' } = process.env;

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authorizatrion = req.headers.authorization;

  if (!authorizatrion || !authorizatrion.startsWith("Bearer ")) {
    return next(new UnauthorizedError());
  }

  const token = authorizatrion.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch {
    return next(new UnauthorizedError());
  }

  req.user = {
    token: payload as JwtPayload & { _id: string; }
  };

  next();
}

export default authMiddleware;