import UnauthorizedError from "errors/unuthorizedError";
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

const extractBearerToken = (token: string) => token.replace('Bearer ', '');


const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authorizatrion = req.headers.authorization;

  if (!authorizatrion || !authorizatrion.startsWith("Bearer ")) {
    return next(new UnauthorizedError());
  }

  const token = extractBearerToken(authorizatrion);
  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch {
    return next(new UnauthorizedError());
  }

  req.user = {
    token: payload as JwtPayload & { _id: string; }
  };

  next();
}

export default authMiddleware;