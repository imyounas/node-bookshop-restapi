var mongoose = require('mongoose');

export const isEmptyObject = (obj: object): boolean => {
    return !Object.keys(obj).length;
};


export const isValidMongoosId = (id: string): boolean => {

    return mongoose.Types.ObjectId.isValid(id);
};