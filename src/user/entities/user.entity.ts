import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ default: 'user name' })
  name: string;

  @Column()
  pass: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
