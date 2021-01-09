import { NestFactory } from '@nestjs/core';
import { BooksModule } from './modules/books.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(BooksModule);
  const options = new DocumentBuilder()
    .setTitle('NestJS CRUD Operations')
    .setDescription('The Books API description')
    .setVersion('1.0')
    .addTag('books')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
