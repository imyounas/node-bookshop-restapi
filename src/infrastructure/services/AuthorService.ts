import AuthorMongModel, { Author } from "../../domain/models/Author";
import { AuthorDto } from "../../application/dtos/AuthorDto";
import { AuthorLookupDto } from "../../application/dtos/AuthorLookupDto";
import HttpException from '../../application/exception/HttpException';
import { isEmptyObject, isValidMongoosId } from '../utils/util';

export class AuthorService {


    public async getAll(): Promise<AuthorDto[]> {

        const authors: AuthorDto[] = await AuthorMongModel.find();
        return authors;
    }

    public async getLookup(): Promise<AuthorLookupDto[]> {

        const authors: AuthorDto[] = await AuthorMongModel.find();
        const lookup: AuthorLookupDto[] = [];

        for (let a of authors) {

            lookup.push(new AuthorLookupDto(`${a.firstName} ${a.lastName}`, a._id))
        }
        return lookup;
    }

    public async getById(id: string): Promise<AuthorDto | null> {

        if (!isValidMongoosId(id)) {
            throw new HttpException(400, "Invalid Id. Please provide valid 12 character Mongo ObjectId");
        }
        const author: AuthorDto | null = await AuthorMongModel.findById(id);
        if (!author) {
            throw new HttpException(409, `No Author found with provided Id ${id}`);
        }

        return author;
    }


    public async create(authorDto: AuthorDto): Promise<AuthorDto> {
        if (isEmptyObject(authorDto)) throw new HttpException(400, "Invalid/Empty Author Dto");


        //const findAuthor: Author | null = await AuthorMongModel.findOne({ _id: authorDto._id });
        //if (findAuthor) throw new HttpException(409, `Author with same ${authorDto._id} already exists`);

        const createAuthorData: AuthorDto = await AuthorMongModel.create({ firstName: authorDto.firstName, lastName: authorDto.lastName });
        return createAuthorData;
    }

    public async update(id: string, authorDto: AuthorDto): Promise<AuthorDto | null> {
        if (isEmptyObject(authorDto)) throw new HttpException(400, "Invalid/Empty Author Dto");

        if (!isValidMongoosId(id)) {
            throw new HttpException(400, "Invalid Id. Please provide valid 12 character Mongo ObjectId");
        }

        const updateAuthorById: AuthorDto | null = await AuthorMongModel.findByIdAndUpdate(id, { ...authorDto });
        if (!updateAuthorById) throw new HttpException(409, `No Author found with provided Id ${id}`);

        return updateAuthorById;
    }

}

export default AuthorService;
