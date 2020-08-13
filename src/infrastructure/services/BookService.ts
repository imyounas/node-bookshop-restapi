import BookMongModel, { Book } from "../../domain/models/Book";
import { BookDto } from "../../application/dtos/BookDto";
import HttpException from '../../application/exception/HttpException';
import { isEmptyObject } from '../utils/util';
import { AuthorService } from "../../infrastructure/services/AuthorService";
import { Author } from "../../domain/models/Author";

export class BookService {


    public async getAll(): Promise<Book[]> {

        const books: Book[] = await BookMongModel.find();
        return books;
    }


    public async getById(id: string): Promise<Book | null> {

        const book: Book | null = await BookMongModel.findById(id);
        if (!book) {
            throw new HttpException(409, `No Book found with provided Id ${id}`);
        }

        return book;
    }


    public async create(bookDto: BookDto): Promise<Book> {
        if (isEmptyObject(bookDto)) throw new HttpException(400, "Invalid/Empty Book Dto");

        // const findBook: Book | null = await BookMongModel.findOne({ _id: bookDto._id });
        //if (findBook) throw new HttpException(409, `Book with same ${bookDto._id} already exists`);

        const authorIsGood: boolean = await this.checkBookAuthor(bookDto);

        const createBookData: Book = await BookMongModel.create({ name: bookDto.name, isbn: bookDto.isbn, authorId: bookDto.authorId });
        return createBookData;
    }

    public async update(id: string, bookDto: BookDto): Promise<Book | null> {
        if (isEmptyObject(bookDto)) throw new HttpException(400, "Invalid/Empty Book Dto");

        const authorIsGood: boolean = await this.checkBookAuthor(bookDto);

        const updateBookById: Book | null = await BookMongModel.findByIdAndUpdate(id, { ...bookDto });
        if (!updateBookById) throw new HttpException(409, `No Book found with provided Id ${id}`);

        return updateBookById;
    }

    private async checkBookAuthor(bookDto: BookDto): Promise<boolean> {
        if (!bookDto.authorId) {
            throw new HttpException(409, `Book cann't be created without valid Author`);
        }

        const authorService = new AuthorService();
        const findAuthor: Author | null = await authorService.getById(bookDto.authorId);
        if (!findAuthor) {
            throw new HttpException(409, `No Author found given against the book ${bookDto.authorId}`);
        }

        return true;
    }

}

export default BookService;
