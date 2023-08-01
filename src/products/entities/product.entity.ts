import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import * as process from 'process';
import { Group } from '../../group/entities/group.entity';
import { Type } from '../../type/entities/type.entity';

@Entity()
export class Product {
  @BeforeInsert()
  async addLinkImg() {
    this.image_link = `${process.env.HOST}/products/image/${this.art}`;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', default: '#product' })
  tag: string;

  @Column({ type: 'varchar' })
  presentation_name: string;

  @Column({ type: 'varchar' })
  art: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'mediumblob' })
  image_data: any;

  @Column({ type: 'varchar' })
  image_link: string;

  @Column({ default: 'no-sales' })
  sales: string;

  @Column({ type: 'int', default: 0 })
  sales_percent: number;

  // @OneToOne(() => Group)
  // @JoinColumn()
  // group: Group;
  //
  // @OneToOne(() => Type)
  // @JoinColumn()
  // type: Type;

  @ManyToOne(() => Type, (type) => type.products)
  type: Type;

  @ManyToOne(() => Group, (group) => group.products)
  group: Group;
}
