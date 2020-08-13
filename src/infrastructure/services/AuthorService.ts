import AuthorMongModel, { Author } from "../../domain/models/Author";
import { AuthorDto } from "../../application/dtos/AuthorDto";
import { AuthorLookupDto } from "../../application/dtos/AuthorLookupDto";
import HttpException from '../../application/exception/HttpException';
import { isEmptyObject } from '../utils/util';

export class AuthorService {


    public async getAll(): Promise<Author[]> {

        const authors: Author[] = await AuthorMongModel.find();
        return authors;
    }

    public async getLookup(): Promise<AuthorLookupDto[]> {

        const authors: Author[] = await AuthorMongModel.find();
        const lookup: AuthorLookupDto[] = [];

        for (let a of authors) {

            let l = new AuthorLookupDto();
            l.key = `${a.firstName} ${a.lastName}`;
            l.value = a._id;

            lookup.push(l)
        }
        return lookup;
    }

    public async getById(id: string): Promise<Author | null> {

        const author: Author | null = await AuthorMongModel.findById(id);
        if (!author) {
            throw new HttpException(409, `No Author found with provided Id ${id}`);
        }

        return author;
    }


    public async create(authorDto: AuthorDto): Promise<Author> {
        if (isEmptyObject(authorDto)) throw new HttpException(400, "Invalid/Empty Author Dto");


        //const findAuthor: Author | null = await AuthorMongModel.findOne({ _id: authorDto._id });
        //if (findAuthor) throw new HttpException(409, `Author with same ${authorDto._id} already exists`);

        const createAuthorData: Author = await AuthorMongModel.create({ firstName: authorDto.firstName, lastName: authorDto.lastName });
        return createAuthorData;
    }

    public async update(id: string, authorDto: AuthorDto): Promise<Author | null> {
        if (isEmptyObject(authorDto)) throw new HttpException(400, "Invalid/Empty Author Dto");


        const updateAuthorById: Author | null = await AuthorMongModel.findByIdAndUpdate(id, { ...authorDto });
        if (!updateAuthorById) throw new HttpException(409, `No Author found with provided Id ${id}`);

        return updateAuthorById;
    }

}

export default AuthorService;
