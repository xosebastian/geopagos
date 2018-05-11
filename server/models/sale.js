import mongoose, { mongo, Mongoose } from 'mongoose';
require('mongoose-double')(mongoose);

import User from './user';
import isEmail from 'validator/lib/isEmail'

const SchemaTypes = mongoose.Schema.Types;

const Schema = mongoose.Schema;


let saleSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId, ref: "User",
        },
        user_email: {
            type: String,
            validate: [ isEmail, 'El email es invalido' ],
            required : [true, "El email es requerido"]
        },
        amount: {
            type : SchemaTypes.Double,
            required : [true, "El valor es requerido"]
        },
        date: {
            type : Date,
            default : Date.now
        },
        status: {
            type : Boolean,
            default : true,
        }
    }
);


saleSchema.methods.toJSON = function() {
    let obj = this.toObject()
    delete obj.status
    delete obj.user
    return obj
}

export default mongoose.model('Sale', saleSchema);

