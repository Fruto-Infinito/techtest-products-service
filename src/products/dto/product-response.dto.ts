import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ProductCategory } from '../@types/enums/product-category.enum';

export class ProductResponseDto {
  @ApiProperty({
    description: 'Unique product identifier',
    example: 'b28d24b3-e5ce-4e75-b0ec-328ffb611ae4',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Name of the product',
    example: 'Organic Green Tea',
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'Detailed description of the product',
    example: 'A pack of 20 organic green tea bags.',
  })
  @Expose()
  description: string;

  @ApiProperty({ description: 'Unit price of the product', example: 9.99 })
  @Expose()
  price: number;

  @ApiProperty({
    description: 'Product category',
    enum: ProductCategory,
    example: ProductCategory.BEVERAGE,
  })
  @Expose()
  category: ProductCategory;

  @ApiProperty({ description: 'Whether the product is active', example: true })
  @Expose()
  isActive: boolean;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-07-01T14:23:00.000Z',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-07-03T11:05:00.000Z',
  })
  @Expose()
  updatedAt: Date;
}
