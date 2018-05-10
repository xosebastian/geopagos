import mongoose, { mongo, Mongoose } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import isEmail from 'validator/lib/isEmail'

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
            unique: true,
            validate: [ isEmail, 'El email es invalido' ],
            required : [true, "El email es requerido"]
        },
        adress: {
            type : String,
        },
        status: {
            type : Boolean,
            default : false,
        },
        delete: {
            type : Boolean,
            default : false,
        },

    }
);

userSchema.methods.toJSON = function() {
    let obj = this.toObject()
    delete obj.delete
    return obj
}

userSchema.plugin( uniqueValidator, {message: 'El {PATH} debe de ser único'});

module.exports = mongoose.model('User', userSchema);

