import * as mongoose from "mongoose";

export interface Author {
    _id: string;
    lastName: string;
    firstName: string;

}

const authorSchema = new mongoose.Schema({

    firstName: String,
    lastName: String

});

const AuthorMongModel = mongoose.model<Author & mongoose.Document>("authors", authorSchema);

export default AuthorMongModel;
