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

      const { email, id, name, confirm_id } = await this.userRepository.save(
        user,
      );

      const sendEmail = await this.mailerService.sendMail({
        to: email,
        subject: 'Confirmation account',
        template: './template_confirmation_user',
        attachments: [],
        context: {
          user_name: dataUser.name ? dataUser.name : 'Заказчик',
          confirm_url: `http://localhost:3000/auth/confirmation?email=${email}&id=${confirm_id}`,
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
            const refresh_Token = jwt.sign(
              { email: user.email },
              process.env.JWT_CONSTANT_REFRESH_TOKEN,
              { expiresIn: process.env.JWT_LIFETIME_REFRESH_TOKEN },
            );
            const access_Token = jwt.sign(
              {
                email: user.email,
                refreshToken: refresh_Token,
              },
              process.env.JWT_CONSTANT_ACCESS_TOKEN,
              { expiresIn: process.env.JWT_LIFETIME_ACCESS_TOKEN },
            );

            user.refreshToken = refresh_Token;
            user.accessToken = access_Token;
            user.auth_status = true;
            await this.userRepository.save(user);

            return { status: 200, access_Token };
          } else {
            return { status: 403, msg: 'Account not confirmed' };
          }
        } else {
          return { status: 400, msg: 'Password or email is not correct' };
        }
      } else {
        return { status: 404, msg: 'Account not found' };
      }
    } catch (err) {
      console.log(`[${new Date().toJSON()}] ERROR AuthService Create: `, err);
      throw err;
    }
  }

  async confirm(email: string, id: string) {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: {
          email: email,
        },
      });

      if (user.confirm_id === id) {
        user.confirmation = true;
        const { email, confirmation } = await this.userRepository.save(user);
        return { status: 200, email, confirmation };
      }
    } catch (err) {
      console.log(`[${new Date().toJSON()}] ERROR AuthService Confirm: `, err);
      throw err;
    }
  }
}
