import { Request, Response, NextFunction } from 'express';
import { authChecker } from './lib/authChecker';
import { ApiResponse } from '@nestjs/swagger';

interface RequestAuthProps {
  email: string;
  pass: string;
}

export function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const check = authChecker(req);

  if (check.checkEmail.status === 200 && check.checkPass.status === 200) {
    next();
  } else if (check.checkEmail.status !== 200) {
    res.status(check.checkEmail.status).send(check.checkEmail.msg);
  } else if (check.checkPass.status !== 200) {
    res.status(check.checkPass.status).send(check.checkPass.msg);
  } else {
    res.status(500).send('Unhandled exception');
  }
}
