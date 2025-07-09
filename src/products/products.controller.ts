import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  Query,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductsDto } from './dto/find-products.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { ProductSummaryDto } from './dto/product-summary.dto';
import { PaginatedProductSummaryDto } from './dto/paginated-product-summary.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiParam,
  ApiQuery,
  ApiCreatedResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List all products with filters and pagination' })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Search by product name (ILIKE)',
  })
  @ApiQuery({
    name: 'category',
    required: false,
    description: 'Filter by category',
  })
  @ApiQuery({
    name: 'isActive',
    required: false,
    description: 'Filter by active status (true/false)',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'perPage',
    required: false,
    description: 'Items per page (default: 10)',
  })
  @ApiOkResponse({
    description: 'List of products with pagination metadata',
    type: PaginatedProductSummaryDto,
  })
  @HttpCode(HttpStatus.OK)
  findAll(@Query() filters: FindProductsDto): Promise<{
    products: ProductSummaryDto[];
    meta: { total: number; page: number; perPage: number };
  }> {
    return this.productsService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product details by ID' })
  @ApiParam({ name: 'id', description: 'Product UUID', type: 'string' })
  @ApiOkResponse({
    type: ProductResponseDto,
    description: 'Complete product details',
  })
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ProductResponseDto> {
    return this.productsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiCreatedResponse({
    type: ProductResponseDto,
    description: 'Created product details',
  })
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductResponseDto> {
    return this.productsService.create(createProductDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({ name: 'id', description: 'Product UUID', type: 'string' })
  @ApiOkResponse({
    type: ProductResponseDto,
    description: 'Updated product details',
  })
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({ name: 'id', description: 'Product UUID', type: 'string' })
  @ApiNoContentResponse({ description: 'Product successfully deleted' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.productsService.remove(id);
  }
}
