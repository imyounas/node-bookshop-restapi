import BookMongModel, { Book } from "../../domain/models/Book";
import { BookDto } from "../../application/dtos/BookDto";
import HttpException from '../../application/exception/HttpException';
import { AuthorService } from "../../infrastructure/services/AuthorService";
import { AuthorDto } from "../../application/dtos/AuthorDto";
import { isEmptyObject, isValidMongoosId } from '../utils/util';

export class BookService {


    public async getAll(): Promise<BookDto[]> {

        const books: BookDto[] = await BookMongModel.find();
        return books;
    }


    public async getById(id: string): Promise<BookDto | null> {

        if (!isValidMongoosId(id)) {
            throw new HttpException(400, "Invalid Id. Please provide valid 12 character Mongo ObjectId");
        }

        const book: BookDto | null = await BookMongModel.findById(id);
        if (!book) {
            throw new HttpException(409, `No Book found with provided Id ${id}`);
        }

        return book;
    }


    public async create(bookDto: BookDto): Promise<BookDto> {
        if (isEmptyObject(bookDto)) {
            throw new HttpException(400, "Invalid/Empty Book Dto");
        }

        // const findBook: Book | null = await BookMongModel.findOne({ _id: bookDto._id });
        //if (findBook) throw new HttpException(409, `Book with same ${bookDto._id} already exists`);

        const authorIsGood: boolean = await this.checkBookAuthor(bookDto);

        const createBookData: BookDto = await BookMongModel.create({ name: bookDto.name, isbn: bookDto.isbn, authorId: bookDto.authorId });
        return createBookData;
    }

    public async update(id: string, bookDto: BookDto): Promise<BookDto | null> {

        if (!isValidMongoosId(id)) {
            throw new HttpException(400, "Invalid Id. Please provide valid 12 character Mongo ObjectId");
        }

        if (isEmptyObject(bookDto)) {
            throw new HttpException(400, "Invalid/Empty Book Dto");
        }

        const authorIsGood: boolean = await this.checkBookAuthor(bookDto);

        const updateBookById: BookDto | null = await BookMongModel.findByIdAndUpdate(id, { ...bookDto });
        if (!updateBookById) {
            throw new HttpException(409, `No Book found with provided Id ${id}`);
        }

        return updateBookById;
    }

    private async checkBookAuthor(bookDto: BookDto): Promise<boolean> {
        if (!bookDto.authorId) {
            throw new HttpException(409, `Book cann't be created without valid Author`);
        }

        if (!isValidMongoosId(bookDto.authorId)) {
            throw new HttpException(400, "Invalid Id. Please provide valid 12 character Mongo ObjectId");
        }

        const authorService = new AuthorService();
        const findAuthor: AuthorDto | null = await authorService.getById(bookDto.authorId);
        if (!findAuthor) {
            throw new HttpException(409, `No Author found given against the book ${bookDto.authorId}`);
        }

        return true;
    }

}

export default BookService;
