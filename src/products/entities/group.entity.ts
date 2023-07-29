import {
  BeforeInsert,
  Column,
  Entity, Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as process from 'process';
import { Type } from './type.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  group_name: string;

  @OneToMany(() => Type, (type) => type.group)
  types: Type[];
}
