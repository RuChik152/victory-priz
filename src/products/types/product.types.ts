import { Group } from '../entities/group.entity';

export interface ProductTypes {
  id: number;
  name: string;
  presentation_name: string;
  art: string;
  price: number;
  description: string;
  image_data: any;
  image_link: string;
  type: string;
  sales: string;
  sales_percent: number;
  group: Group;
}
