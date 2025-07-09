import {
  IsEnum,
  IsOptional,
  IsString,
  IsBooleanString,
  IsInt,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ProductCategory } from '../@types/enums/product-category.enum';

export class FindProductsDto {
  @ApiPropertyOptional({
    enum: ProductCategory,
    description: 'Filter by product category',
  })
  @IsOptional()
  @IsEnum(ProductCategory, { message: 'Invalid category' })
  category?: ProductCategory;

  @ApiPropertyOptional({
    description: 'Filter by active status ("true" or "false")',
  })
  @IsOptional()
  @IsBooleanString({ message: 'isActive must be "true" or "false"' })
  isActive?: string;

  @ApiPropertyOptional({
    description: 'Case-insensitive partial match on product name',
  })
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  name?: string;

  @ApiPropertyOptional({
    description: 'Page number (starting from 1)',
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Page must be an integer' })
  @Min(1, { message: 'Page must be at least 1' })
  page?: number;

  @ApiPropertyOptional({ description: 'Items per page', default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'perPage must be an integer' })
  @Min(1, { message: 'perPage must be at least 1' })
  perPage?: number;
}
