import mongoose, { mongo, Mongoose } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import isEmail from 'validator/lib/isEmail'
import Sale from './sale';

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
        sales: [{
            type: Schema.Types.ObjectId, ref: "Sale",
        }],
    }
);

/*userSchema.methods.toJSON = function() {
    let obj = this.toObject()
    delete obj.status
    return obj
}*/

userSchema.plugin( uniqueValidator, {message: 'El {PATH} debe de ser único'});

export default mongoose.model('User', userSchema);;

