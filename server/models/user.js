import mongoose, { mongo, Mongoose } from 'mongoose';

const Schema = mongoose.Schema;

let userSchema = new Schema(
    {
        name: {
            type : String,
            required : [true, "El nombre es requerido"]
        },
        surname: {
            type : String,
            required : [true, "El apellido es requerido"]
        },
        email: {
            type : String,
            required : [true, "El email es requerido"]
        },
        adress: {
            type : String,
        },
        status: {
            type : Boolean,
            default : true,
        },
        delete: {
            type : Boolean,
            default : false,
        },

    }
);

module.exports = mongoose.model('User', userSchema);

