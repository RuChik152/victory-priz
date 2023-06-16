import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

export function TokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  next();
}
