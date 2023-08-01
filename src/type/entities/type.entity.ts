import {
  BeforeInsert,
  Column,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as process from 'process';
import { Group } from '../../group/entities/group.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Type {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  type_name: string;

  @ManyToOne(() => Group, (group) => group.types)
  group: Group;

  @OneToMany(() => Product, (product) => product.type)
  products: Product[];
}
