import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Type } from '../../type/entities/type.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  group_name: string;

  @OneToMany(() => Type, (type) => type.group)
  types: Type[];
}
