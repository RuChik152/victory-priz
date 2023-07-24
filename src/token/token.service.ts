import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import * as process from 'process';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async verify(tokens: CreateTokenDto) {
    try {
      const access_Token = jwt.sign(
        { email: tokens.email, refreshToken: tokens.refreshToken },
        process.env.JWT_CONSTANT_ACCESS_TOKEN,
        { expiresIn: process.env.JWT_LIFETIME_ACCESS_TOKEN },
      );

      const user = await this.userRepository.findOneOrFail({
        where: {
          email: tokens.email,
        },
      });

      user.accessToken = access_Token;

      const { accessToken } = await this.userRepository.save(user);
      return { status: 200, accessToken };
    } catch (err) {
      throw err;
    }
  }
}
