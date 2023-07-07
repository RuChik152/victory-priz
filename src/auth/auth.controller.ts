import { Controller, Post, Body, Get, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Request, Response, NextFunction, response } from 'express';
import { ApiResponse } from '@nestjs/swagger';
import * as process from 'process';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiResponse({
    status: 200,
    description: 'Request completed successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'The password must contain at least 10 characters',
  })
  @ApiResponse({ status: 500, description: 'Unhandled exception' })
  async creatUser(@Body() dataBody: CreateAuthDto) {
    try {
      return await this.authService.create(dataBody);
    } catch (error) {
      console.log(
        `[${new Date().toJSON()}] ERROR AuthController CreateUser: `,
        error,
      );
    }
  }

  @Post('/signin')
  async authUser(@Body() dataBody: CreateAuthDto, @Res() res: Response) {
    try {
      const user = await this.authService.auth(dataBody);
      switch (user.status) {
        case 404:
        case 403:
        case 400:
          res.status(user.status).send({ msg: user.msg });
          break;
        case 200:
          res.status(user.status).send({
            accessToken: user.access_Token,
            id: user.id,
            email: user.email,
            name: user.name,
          });
          break;
        default:
          res.status(500).send({ msg: 'an unhandled exception' });
          break;
      }
    } catch (err) {
      console.log(
        `[${new Date().toJSON()}] ERROR AuthController AuthUser: `,
        err,
      );
    }
  }

  @Get('confirmation')
  async confirmUser(@Query() query: { email: string; id: string }) {
    console.log('QUERY: ', query);
    try {
      return await this.authService.confirm(query.email, query.id);
    } catch (err) {
      console.log(
        `[${new Date().toJSON()}] ERROR AuthController ConfirmUser: `,
        err,
      );
    }
  }
}
