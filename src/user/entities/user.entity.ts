import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @BeforeInsert()
  async hashPassword() {
    const hash = await bcrypt.hash(this.pass, 10);
    this.pass = hash;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ default: 'user name' })
  name: string;

  @Column()
  pass: string;

  @Column({ default: false })
  auth_status: boolean;

  @Column({ default: false })
  confirmation: boolean;

  @Column({ default: '' })
  accessToken: string;

  @Column({ default: '' })
  refreshToken: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
