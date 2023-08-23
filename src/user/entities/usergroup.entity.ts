import {
  Column,
  Entity, JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Usergroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  name: string;

  @ManyToMany(() => User, (user) => user.usergroups, {
    cascade: true,
  })
  @JoinTable()
  users: User[];
}
