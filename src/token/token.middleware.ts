import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as process from 'process';

export type DecodeType = {
  email: string;
  pass: string;
  iat: number;
  exp: number;
  refreshToken: string;
};

export function TokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('TOKEN MIDDLE WARE: ', req.body);
  jwt.verify(
    req.body.accessToken,
    process.env.JWT_CONSTANT_ACCESS_TOKEN,
    { complete: false },
    (err, decoded: DecodeType) => {
      if (err) {
        console.log('ERROR CHECK ACCESS TOKEN: ', err);

        //TODO
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { refreshToken } = jwt.decode(req.body.accessToken);
        console.log('DECODE TOKEN: ', refreshToken);
        if (typeof refreshToken === 'string') {
          jwt.verify(
            refreshToken,
            process.env.JWT_CONSTANT_REFRESH_TOKEN,
            (err, decoded: DecodeType) => {
              if (err) {
                console.log('ERROR REFRESH TOKEN: ', err);
                res.status(403).send('Access denied');
              } else {
                console.log('SUCCESS REFRESH TOKEN: ', decoded);
                req.body.refreshToken = refreshToken;
                req.body.email = decoded.email;
                next();
              }
            },
          );
        }
      } else {
        console.log('SUCCESS CHECK ACCESS TOKEN', decoded);
        res.status(200).send({
          accessToken: req.body.accessToken,
        });
      }
    },
  );
}
