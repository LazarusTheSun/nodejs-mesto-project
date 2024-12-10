export * from 'express-serve-static-core';
import { JwtPayload } from 'jsonwebtoken';

declare module 'express-serve-static-core' {
  interface Request {
    user: {
      _id: Schema.Types.ObjectId;
      token: string | JwtPayload;
    }
  }
}