import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductCategory } from './@types/enums/product-category.enum';

describe('ProductsService', () => {
  let service: ProductsService;
  let repo: jest.Mocked<ProductsRepository>;

  const productMock: Product = {
    id: 'abc',
    name: 'Test Product',
    description: 'A test product',
    price: 100,
    category: ProductCategory.OTHER,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: ProductsRepository,
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
            createQueryBuilder: jest.fn().mockReturnValue({
              andWhere: jest.fn().mockReturnThis(),
              skip: jest.fn().mockReturnThis(),
              take: jest.fn().mockReturnThis(),
              getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
            }),
          },
        },
      ],
    }).compile();

    service = module.get(ProductsService);
    repo = module.get(ProductsRepository);
  });

  it('should return paginated results', async () => {
    const result = await service.findAll({});
    expect(result).toHaveProperty('products');
    expect(result.meta).toEqual({ total: 0, page: 1, perPage: 10 });
  });

  it('should throw if product not found', async () => {
    repo.findOne.mockResolvedValue(null);
    await expect(service.findOne('123')).rejects.toThrow(NotFoundException);
  });

  it('should return product if found', async () => {
    repo.findOne.mockResolvedValue(productMock);
    const result = await service.findOne('abc');
    expect(result).toHaveProperty('id', 'abc');
  });

  it('should create and return product', async () => {
    const createDto: CreateProductDto = {
      name: 'Product',
      description: 'Description',
      price: 10,
      category: ProductCategory.OTHER,
    };

    const created: Product = { ...productMock, ...createDto };

    repo.create.mockReturnValue(created);
    repo.save.mockResolvedValue(created);

    const result = await service.create(createDto);
    expect(result).toHaveProperty('id', 'abc');
  });

  it('should update and return product', async () => {
    const updateDto: UpdateProductDto = {
      name: 'Updated',
    };

    repo.findOne.mockResolvedValue(productMock);
    repo.save.mockResolvedValue({ ...productMock, ...updateDto });

    const result = await service.update('abc', updateDto);
    expect(result).toHaveProperty('name', 'Updated');
  });

  it('should delete product', async () => {
    repo.findOne.mockResolvedValue(productMock);
    repo.remove.mockResolvedValue(productMock);
    await expect(service.remove('abc')).resolves.toBeUndefined();
  });
});
