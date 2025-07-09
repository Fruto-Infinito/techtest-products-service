import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductsDto } from './dto/find-products.dto';
import { ProductCategory } from './@types/enums/product-category.enum';
import { ProductResponseDto } from './dto/product-response.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: jest.Mocked<ProductsService>;

  const createMockProduct = (
    overrides: Partial<ProductResponseDto> = {},
  ): ProductResponseDto => ({
    id: 'mock-id',
    name: 'Mock Product',
    description: 'Mock Description',
    price: 10.0,
    category: ProductCategory.OTHER,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue({
              products: [],
              meta: { total: 0, page: 1, perPage: 10 },
            }),
            findOne: jest.fn().mockResolvedValue(createMockProduct()),
            create: jest.fn().mockResolvedValue(createMockProduct()),
            update: jest.fn().mockResolvedValue(createMockProduct()),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get(ProductsController);
    service = module.get(ProductsService);
  });

  it('should call service.create with dto', async () => {
    const dto: CreateProductDto = {
      name: 'Product',
      description: 'desc',
      category: ProductCategory.OTHER,
      price: 10,
    };

    const expected = createMockProduct({ name: dto.name });
    service.create.mockResolvedValue(expected);

    const result = await controller.create(dto);

    expect(result).toEqual(expected);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should call service.findAll with filters', async () => {
    const filters: FindProductsDto = { name: 'Tea' };
    const expected = {
      products: [],
      meta: { total: 0, page: 1, perPage: 10 },
    };

    service.findAll.mockResolvedValue(expected);
    const result = await controller.findAll(filters);
    expect(result).toEqual(expected);
    expect(service.findAll).toHaveBeenCalledWith(filters);
  });

  it('should call service.findOne with ID', async () => {
    const expected = createMockProduct({ id: '123' });
    service.findOne.mockResolvedValue(expected);

    const result = await controller.findOne('123');
    expect(result).toEqual(expected);
    expect(service.findOne).toHaveBeenCalledWith('123');
  });

  it('should call service.update with ID and dto', async () => {
    const dto: UpdateProductDto = { name: 'Updated' };
    const expected = createMockProduct({ id: '123', ...dto });
    service.update.mockResolvedValue(expected);

    const result = await controller.update('123', dto);
    expect(result).toEqual(expected);
    expect(service.update).toHaveBeenCalledWith('123', dto);
  });

  it('should call service.remove with ID', async () => {
    await controller.remove('123');
    expect(service.remove).toHaveBeenCalledWith('123');
  });
});
