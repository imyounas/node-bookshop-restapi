import { NextFunction, Request, Response } from "express";
import { Book } from "../../domain/models/Book";
import { BookService } from "../../infrastructure/services/BookService";
import { BookDto } from "application/dtos/BookDto";


class BookController {
    public bookService = new BookService();

    public getBooks = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const allBooks: BookDto[] = await this.bookService.getAll();
            res.status(200).json(allBooks);
        } catch (error) {
            next(error);
        }
    };


    public getBookById = async (req: Request, res: Response, next: NextFunction) => {
        const id: string = req.params.id;

        try {
            const findBook: BookDto | null = await this.bookService.getById(id);
            res.status(200).json(findBook);
        } catch (error) {
            next(error);
        }
    }

    public createBook = async (req: Request, res: Response, next: NextFunction) => {

        const BookDto: BookDto = req.body;

        try {
            const book: BookDto = await this.bookService.create(BookDto);
            res.status(201).json(book);
        } catch (error) {
            next(error);
        }
    };


    public updateBook = async (req: Request, res: Response, next: NextFunction) => {
        const id: string = req.params.id;
        const BookDto: BookDto = req.body;

        try {
            const updateBookData: BookDto | null = await this.bookService.update(id, BookDto);
            res.status(200).json(updateBookData);
        } catch (error) {
            next(error);
        }
    }

}

export default BookController;
