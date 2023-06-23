import { Request, Response, NextFunction } from 'express';
import { authChecker } from './lib/authChecker';

interface RequestAuthProps {
  email: string;
  pass: string;
}

export function AuthMiddleware(
  req: Request<RequestAuthProps>,
  res: Response,
  next: NextFunction,
) {
  const check = authChecker(req.body.email);
  if (check) {
    next();
  } else {
    res.status(400).send({ msg: 'the Email format is not correct' });
  }
}
