import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductsDto } from './dto/find-products.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { ProductSummaryDto } from './dto/product-summary.dto';
import { mapToDto } from '@/common/utils/dto-mapper.util';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async findAll(filters: FindProductsDto): Promise<{
    products: ProductSummaryDto[];
    meta: { total: number; page: number; perPage: number };
  }> {
    const query = this.productsRepository.createQueryBuilder('product');

    if (filters.category) {
      query.andWhere('product.category = :category', {
        category: filters.category,
      });
    }

    if (filters.isActive !== undefined) {
      query.andWhere('product.is_active = :isActive', {
        isActive: filters.isActive === 'true',
      });
    }

    if (filters.name) {
      query.andWhere('product.name ILIKE :name', {
        name: `%${filters.name}%`,
      });
    }

    const page = filters.page ?? 1;
    const perPage = filters.perPage ?? 10;

    query.skip((page - 1) * perPage).take(perPage);

    const [products, total] = await query.getManyAndCount();

    return {
      products: mapToDto(
        ProductSummaryDto,
        products,
      ) as unknown as ProductSummaryDto[],
      meta: { total, page, perPage },
    };
  }

  async findOne(id: string): Promise<ProductResponseDto> {
    const product = await this.getProductOrFail(id);
    return mapToDto(ProductResponseDto, product);
  }

  async findOneEntity(id: string): Promise<Product> {
    return this.getProductOrFail(id);
  }

  async create(
    createProductDto: CreateProductDto,
  ): Promise<ProductResponseDto> {
    const product = this.productsRepository.create(createProductDto);
    const saved = await this.productsRepository.save(product);
    return mapToDto(ProductResponseDto, saved);
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    const product = await this.getProductOrFail(id);
    const updated = Object.assign(product, updateProductDto);
    const saved = await this.productsRepository.save(updated);
    return mapToDto(ProductResponseDto, saved);
  }

  async remove(id: string): Promise<void> {
    const product = await this.getProductOrFail(id);
    await this.productsRepository.remove(product);
  }

  private async getProductOrFail(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }
}
