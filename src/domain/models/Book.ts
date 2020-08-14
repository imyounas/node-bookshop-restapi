import * as mongoose from "mongoose";

export interface Book {
    _id: string;
    name: string;
    isbn: string;
    authorId: string;

}

const bookSchema = new mongoose.Schema({

    name: String,
    isbn: String,
    authorId: String

});

const BookMongModel = mongoose.model<Book & mongoose.Document>("books", bookSchema);

export default BookMongModel;