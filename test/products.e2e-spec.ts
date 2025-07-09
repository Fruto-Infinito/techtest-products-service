import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as request from 'supertest';
import { AppModule } from '@/app.module';
import { ProductCategory } from '@/products/@types/enums/product-category.enum';

describe('ProductsController (e2e)', () => {
  let app: NestExpressApplication;
  let createdProductId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/products (POST) creates a product', async () => {
    const response = await request(app.getHttpServer()).post('/products').send({
      name: 'Test Product',
      description: 'Sample description',
      category: ProductCategory.BEVERAGE,
      price: 100,
    });

    expect(response.body).toHaveProperty('id');
    createdProductId = response.body.id;
  });

  it('/products (GET) returns paginated list', async () => {
    const response = await request(app.getHttpServer())
      .get('/products')
      .expect(200);

    expect(response.body).toHaveProperty('products');
    expect(Array.isArray(response.body.products)).toBe(true);
  });

  it('/products/:id (GET) returns product by ID', async () => {
    const response = await request(app.getHttpServer())
      .get(`/products/${createdProductId}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', createdProductId);
  });

  it('/products/:id (PATCH) updates product', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/products/${createdProductId}`)
      .send({ name: 'Updated Product' })
      .expect(200);

    expect(response.body).toHaveProperty('name', 'Updated Product');
  });

  it('/products/:id (DELETE) removes product', async () => {
    await request(app.getHttpServer())
      .delete(`/products/${createdProductId}`)
      .expect(204);
  });
});
