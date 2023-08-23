import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { Order } from './order.entity';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import { Usergroup } from './usergroup.entity';

@Entity()
export class User {
  @BeforeInsert()
  async hashPassword() {
    const hash = await bcrypt.hash(this.pass, 10);
    this.pass = hash;
  }

  @BeforeInsert()
  async createConfirmId() {
    this.confirm_id = uuid.v4();
  }

  @BeforeInsert()
  async addCustomGroup() {}

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
  confirm_id: string;

  @Column({ type: 'text' })
  accessToken: string;

  @Column({ type: 'text' })
  refreshToken: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @ManyToMany(() => Usergroup, (usergroup) => usergroup.users)
  usergroups: Usergroup[];
}
