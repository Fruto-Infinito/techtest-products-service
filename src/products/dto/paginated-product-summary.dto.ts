import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ProductSummaryDto } from './product-summary.dto';

class MetaDto {
  @ApiProperty({
    description: 'Total number of products available',
    example: 125,
  })
  @Expose()
  total: number;

  @ApiProperty({
    description: 'Current page number',
    example: 2,
  })
  @Expose()
  page: number;

  @ApiProperty({
    description: 'Number of products returned per page',
    example: 10,
  })
  @Expose()
  perPage: number;
}

export class PaginatedProductSummaryDto {
  @ApiProperty({
    description: 'List of products for the current page',
    type: [ProductSummaryDto],
  })
  @Expose()
  products: ProductSummaryDto[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: MetaDto,
  })
  @Expose()
  meta: MetaDto;
}
