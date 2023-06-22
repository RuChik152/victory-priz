import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as process from 'process';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private mailerService: MailerService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(dataUser: CreateAuthDto) {
    try {
      const user = await this.userRepository.create(dataUser);
      const { email, id, name } = await this.userRepository.save(user);

      const sendEmail = await this.mailerService.sendMail({
        to: dataUser.email,
        subject: 'Confirmation account',
        template: './template_confirmation_user',
        attachments: [],
        context: {
          user_name: dataUser.name ? dataUser.name : 'Заказчик',
          confirm_url: 'http://localhost:3000',
        },
      });
      console.log(
        `[${new Date().toJSON()}] SEND EMAIL from : ${dataUser.email}: `,
        sendEmail.response,
      );
      return { email, id, name };
    } catch (err) {
      console.log(`[${new Date().toJSON()}] ERROR AuthService Create: `, err);
      throw err;
    }
  }

  async auth(dataUser: CreateAuthDto) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email: dataUser.email,
        },
      });

      if (user) {
        const pass = await bcrypt.compare(dataUser.pass, user.pass);
        if (pass) {
          if (user.confirmation) {
            const refreshToken = jwt.sign(
              { email: user.email, pass: user.pass },
              process.env.JWT_CONSTANT_REFRESH_TOKEN,
              { expiresIn: process.env.JWT_LIFETIME_REFRESH_TOKEN },
            );
            const accessToken = jwt.sign(
              { email: user.email, pass: user.pass },
              process.env.JWT_CONSTANT_ACCESS_TOKEN,
              { expiresIn: process.env.JWT_LIFETIME_ACCESS_TOKEN },
            );

            user.refreshToken = refreshToken;
            user.accessToken = accessToken;
            user.auth_status = true;
            await this.userRepository.save(user);

            return user;
          } else {
            return { status: 403, msg: 'Account not confirmed' };
          }
        } else {
          return { status: 403, msg: 'Password or email is not correct' };
        }
      } else {
        return { status: 403, msg: 'Account not found' };
      }
    } catch (err) {
      console.log(`[${new Date().toJSON()}] ERROR AuthService Create: `, err);
      throw err;
    }
  }
}
