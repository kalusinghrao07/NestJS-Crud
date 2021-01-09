import { Controller,Post,Body,Get,Param,Patch,Delete,HttpStatus } from '@nestjs/common';
import { from } from 'rxjs';

import { BooksService } from '../services/books.service';
import { BookViewModel } from '../viewmodels/book.viewmodel';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }
    
    @Post('AddUpdate')
    async addBook(@Body() book: BookViewModel) {
        const bookResponse = await this.booksService.addUpdate(book);
        return {
            statusCode: HttpStatus.OK,
            message: book.id == null || book.id == "" ? 'Book added successfully' : 'Book updated successfully',
            data: bookResponse,
        };
    }

    @Get('GetAll')
    async getAllBooks() {
        const books = await this.booksService.getBooks();
        return books;
    }

    @Get('GetById/:id')
    getBook(@Param('id') bookId: string) {
        return this.booksService.getBook(bookId);
    }

    @Delete('DeleteById/:id')
    async removeBook(@Param('id') bookId: string) {
        const isDeleted = await this.booksService.deleteBook(bookId);
        if (isDeleted) {
            return {
                statusCode: HttpStatus.OK,
                message: 'book deleted successfully',
            };
        }
    }
}