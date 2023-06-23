import { Controller, Post, Body } from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateTokenDto } from './dto/create-token.dto';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post('verify')
  async verifyToken(@Body() tokens: CreateTokenDto) {
    console.log('TOKENS CONTROLLER: ', tokens);
    try {
      return await this.tokenService.verify(tokens);
    } catch (err) {
      throw err;
    }
  }
}
