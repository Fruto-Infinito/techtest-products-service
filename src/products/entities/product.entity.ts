import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductCategory } from '../@types/enums/product-category.enum';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    comment: 'Unique identifier of the product',
  })
  id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
    comment: 'Name of the product',
  })
  name: string;

  @Column({
    name: 'description',
    type: 'text',
    comment: 'Detailed description of the product',
  })
  description: string;

  @Column({
    name: 'price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: 'Unit price of the product',
  })
  price: number;

  @Column({
    name: 'category',
    type: 'enum',
    enum: ProductCategory,
    comment: 'Category the product belongs to',
  })
  category: ProductCategory;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
    comment: 'Indicates whether the product is active',
  })
  isActive: boolean;

  @CreateDateColumn({
    name: 'created_at',
    comment: 'Timestamp of when the product was created',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    comment: 'Timestamp of the last product update',
  })
  updatedAt: Date;
}
