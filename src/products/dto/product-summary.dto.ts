import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ProductCategory } from '../@types/enums/product-category.enum';

export class ProductSummaryDto {
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
}
