import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
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
  async authUser(@Body() dataBody: CreateAuthDto) {
    try {
      return await this.authService.auth(dataBody);
    } catch (error) {
      console.log(
        `[${new Date().toJSON()}] ERROR AuthController AuthUser: `,
        error,
      );
    }
  }
}
