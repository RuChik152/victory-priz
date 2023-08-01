import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Group } from '../../group/entities/group.entity';
import { Type } from '../../type/entities/type.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Product)
  @JoinColumn()
  product: Product;

  @OneToOne(() => Group)
  @JoinColumn()
  group: Group;

  @OneToOne(() => Type)
  @JoinColumn()
  type: Type;
}
