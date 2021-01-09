import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BooksController } from '../controllers/books.controller';
import { BooksService } from '../services/books.service';
import { BookSchema } from '../models/books.model';

@Module({
  imports: [
      MongooseModule.forRoot('mongodb://localhost/NestJSDb'),
      MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }])
    ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}