import { Request, Response, NextFunction } from 'express';

type AuthCheckerResponse = {
  checkEmail: ResponseCheckerType;
  checkPass: ResponseCheckerType;
};
export function authChecker(req: Request): AuthCheckerResponse {
  let checkEmail: ResponseCheckerType;
  let checkPass: ResponseCheckerType;

  if (Object.keys(req.body).length !== 0) {
    checkEmail = emailChecker(req.body.email);
    checkPass = passwordChecker(req.body.pass);
  } else if (Object.keys(req.params).length !== 0) {
    checkEmail = emailChecker(req.params.email);
    checkPass = passwordChecker(req.params.pass);
  } else if (Object.keys(req.query).length !== 0) {
    checkEmail = emailChecker(String(req.query.email));
    checkPass = passwordChecker(req.params.pass);
  } else {
    checkEmail = { status: 500, msg: 'Email Unhandled exception' };
    checkPass = { status: 500, msg: 'Pass Unhandled exception' };
  }

  return { checkEmail, checkPass };
}

type ResponseCheckerType = {
  status: number;
  msg: string;
};

function emailChecker(email: string): ResponseCheckerType {
  const data = email.toLowerCase();
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(data)) {
    return { status: 200, msg: '' };
  } else {
    return { status: 400, msg: 'the Email format is not correct' };
  }
}

function passwordChecker(pass: string): ResponseCheckerType {
  const re = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(pass);
  const reRu = /[а-яА-ЯЁё]/.test(pass);
  const reEn = /[a-zA-Z]/.test(pass);
  const reInt = /[0-9]/.test(pass);

  if (pass.length < 10) {
    return {
      status: 400,
      msg: 'The password must contain at least 10 characters',
    };
  } else if (!re) {
    return {
      status: 400,
      msg: 'Not found special characters',
    };
  } else if (reRu) {
    return {
      status: 400,
      msg: 'Latin only letters',
    };
  } else if (!reEn) {
    return {
      status: 400,
      msg: 'Latin only letters',
    };
  } else if (!reInt) {
    return {
      status: 400,
      msg: 'Not found number',
    };
  } else {
    return {
      status: 200,
      msg: '',
    };
  }
}
