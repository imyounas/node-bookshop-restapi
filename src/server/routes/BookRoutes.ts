import { Router } from "express";
import BookController from "../controllers/BookController";
import IRoute from "../../application/interfaces/IRoute";
import dtoValidationMiddleware from "../../application/middlewares/dtoValidationMiddlewares";

import { Book } from "../../domain/models/Book";
import { BookService } from "../../infrastructure/services/BookService";

import { BookDto } from "../../application/dtos/BookDto";


class BookRoute implements IRoute {
    public paths = "/api/books";
    public path = "/api/book";

    public router = Router();
    public bookController = new BookController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {

        this.router.get(`${this.paths}`, this.bookController.getBooks);
        this.router.get(`${this.path}/:id`, this.bookController.getBookById);

        this.router.post(`${this.path}`, dtoValidationMiddleware(BookDto), this.bookController.createBook);

        this.router.put(`${this.path}/:id`, dtoValidationMiddleware(BookDto), this.bookController.updateBook);

    }
}

export default BookRoute;
