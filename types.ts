import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      user: AppUser;
    }
  }
}

declare module 'jsonwebtoken' {
  export function sign<T>(payload: T, secret: string, options?: object): string;
  export function verify(token: string, secret: string): object | string;
}

type MiddlewareFunction<T = void> = (
  req: Request,
  res: Response,
  next: NextFunction
) => T;

type EndpointHandler<T = void> = (
  req: Request,
  res: Response
) => Promise<T> | T;

type ValidatorFunction<T = void> = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<T> | T;

type RateLimiterOptions = {
  limit: number;
  windowMs: number;
};

type RateLimiterMiddleware = MiddlewareFunction;

type AppUser = {
  id: string;
  username: string;
  role: string;
};

type Message = {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  createdAt: Date;
};

export {
  MiddlewareFunction,
  EndpointHandler,
  ValidatorFunction,
  RateLimiterOptions,
  RateLimiterMiddleware,
  AppUser,
  Message,
};