import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync } from 'fs';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Products microservice - Fruto Infinito')
    .setContact(
      'Fruto Infinito Dev Team',
      'https://frutoinfinito.com',
      'support@frutoinfinito.com',
    )
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
    customSiteTitle: 'Products Service - Fruto Infinito',
  });

  writeFileSync('./docs/swagger-spec.json', JSON.stringify(document));
}
