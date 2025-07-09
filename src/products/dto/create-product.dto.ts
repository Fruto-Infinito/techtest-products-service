import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProductCategory } from '../@types/enums/product-category.enum';

export class CreateProductDto {
  @ApiProperty({
    description: 'Name of the product',
    example: 'Organic Green Tea',
  })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @Length(1, 100, { message: 'Name must be between 1 and 100 characters' })
  name: string;

  @ApiProperty({
    description: 'Detailed description of the product',
    example: 'A pack of 20 organic green tea bags with no additives.',
  })
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @ApiProperty({
    description: 'Unit price of the product',
    example: 9.99,
  })
  @IsNumber({}, { message: 'Price must be a number' })
  @IsPositive({ message: 'Price must be greater than 0' })
  price: number;

  @ApiProperty({
    description: 'Category the product belongs to',
    enum: ProductCategory,
    example: ProductCategory.BEVERAGE,
  })
  @Type(() => String)
  @IsEnum(ProductCategory, {
    message: `Category must be one of: ${Object.values(ProductCategory).join(', ')}`,
  })
  category: ProductCategory;
}
