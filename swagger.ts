import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
const options = new DocumentBuilder()
    .setTitle('NestJS CRUD Operations')
    .setDescription('The Books API description')
    .setVersion('1.0')
    .addTag('books')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
}