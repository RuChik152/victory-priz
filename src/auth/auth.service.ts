import { Inject, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as process from 'process';
import { MailerService } from '@nestjs-modules/mailer';
import { Usergroup } from '../user/entities/usergroup.entity';
import { UserService } from '../user/user.service';

type NewUserType = {
  email: string;
  pass: string;
  accessToken: string;
  refreshToken: string;
  confirm_id: string;
};

@Injectable()
export class AuthService {
  constructor(
    private mailerService: MailerService,
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Usergroup)
    private usergroupRepository: Repository<Usergroup>,

    @Inject(UserService)
    private userService: UserService,
  ) {}
  async create(dataUser: CreateAuthDto) {
    try {
      const createUser: NewUserType = Object.assign(
        {},
        {
          email: dataUser.email,
          pass: dataUser.pass,
          accessToken: '',
          refreshToken: '',
          confirm_id: '',
        },
      );

      const user = await this.userRepository.create(createUser);
      const defaultUserGroup = await this.usergroupRepository
        .createQueryBuilder('usegroup')
        .select(['usegroup.id', 'usegroup.name'])
        .where('id = :id', { id: 'ba7f2bfd-0000-0000-0000-000000000001' })
        .getOne();

      user.usergroups = [defaultUserGroup];

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
          confirm_url: `${process.env.HOST}/auth/confirmation?email=${email}&id=${confirm_id}`,
        },
      });
      console.log(
        `[${new Date().toJSON()}] SEND EMAIL from : ${dataUser.email}: `,
        sendEmail,
      );
      return { email, id, name };
    } catch (err) {
      console.log(`[${new Date().toJSON()}] ERROR AuthService Create: `, err);
      throw err;
    }
  }

  async auth(dataUser: CreateAuthDto) {
    try {
      // const user = await this.userRepository.findOne({
      //   where: {
      //     email: dataUser.email,
      //   },
      // });
      // console.log('data1', user);
      const user = await this.userRepository
        .createQueryBuilder('user')
        .select([
          'user.id',
          'user.email',
          'user.name',
          'user.pass',
          'user.auth_status',
          'user.confirmation',
          'user.confirm_id',
          'user.accessToken',
          'user.refreshToken',
        ])
        .leftJoinAndSelect('user.usergroups', 'usergroups')
        .where('user.email = :email', { email: dataUser.email })
        .getOne();

      if (user) {
        const pass = await bcrypt.compare(dataUser.pass, user.pass);
        if (pass) {
          if (user.confirmation) {
            const usergroupToken = jwt.sign(
              {
                usergroup: user.usergroups,
              },
              process.env.JWT_CONSTANT_CRYPT,
              { expiresIn: process.env.JWT_LIFETIME_REFRESH_TOKEN },
            );

            const refresh_Token = jwt.sign(
              { email: user.email },
              process.env.JWT_CONSTANT_REFRESH_TOKEN,
              { expiresIn: process.env.JWT_LIFETIME_REFRESH_TOKEN },
            );
            const access_Token = jwt.sign(
              {
                id: user.id,
                email: user.email,
                usergroup: usergroupToken,
                refreshToken: refresh_Token,
              },
              process.env.JWT_CONSTANT_ACCESS_TOKEN,
              { expiresIn: process.env.JWT_LIFETIME_ACCESS_TOKEN },
            );

            user.refreshToken = refresh_Token;
            user.accessToken = access_Token;
            user.auth_status = true;
            await this.userRepository.save(user);
            console.log('DATA AUTH: ', user);
            return {
              status: 200,
              access_Token,
              id: user.id,
              email: user.email,
              name: user.name,
            };
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
      console.log(`[${new Date().toJSON()}] ERROR AuthService Auth: `, err);
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
