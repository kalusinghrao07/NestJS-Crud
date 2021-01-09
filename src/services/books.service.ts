import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Book } from '../models/books.model';
import { BookViewModel } from '../viewmodels/book.viewmodel';

@Injectable()
export class BooksService {
  constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) {}

  async addUpdate(bookViewModel: BookViewModel) {
    let domainBook;
    if (bookViewModel.id == null || bookViewModel.id == ""){
        domainBook = new this.bookModel({
        title: bookViewModel.title,
        description: bookViewModel.description,
        price: bookViewModel.price,
    });
    }
    else{
        domainBook = await this.findBook(bookViewModel.id);
        if (bookViewModel.title) {
        domainBook.title = bookViewModel.title;
        }
        if (bookViewModel.description) {
        domainBook.description = bookViewModel.description;
        }
        if (bookViewModel.price) {
        domainBook.price = bookViewModel.price;
        }
    }
    const result = domainBook.save();
    return result;
  }

  async getBooks() {
    const books = await this.bookModel.find().exec();
    return books.map(book => ({
      id: book.id,
      title: book.title,
      description: book.description,
      price: book.price,
    }));
  }

  async getBook(bookId: string) {
    const book = await this.findBook(bookId);
    return {
      id: book.id,
      title: book.title,
      description: book.description,
      price: book.price,
    };
  }

  async deleteBook(bookId: string) {
    const result = await this.bookModel.deleteOne({ _id: bookId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find book.');
    }
    return true;
  }

  private async findBook(id: string): Promise<Book> {
    let book;
    try {
      book = await this.bookModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find book.');
    }
    if (!book) {
      throw new NotFoundException('Could not find book.');
    }
    return book;
  }
}