import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as process from 'process';

@Entity()
export class Product {
  @BeforeInsert()
  async addLinkImg() {
    this.image_link = `${process.env.HOST}/products/image/${this.art}`;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

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
  image_link: any;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'varchar' })
  group: string;

  @Column({ default: 'no-sales' })
  sales: string;

  @Column({ type: 'int', default: 0 })
  sales_percent: number;
}
