import express from "express";
import Sale from '../models/sale'
import User from '../models/user';
import _ from 'underscore';
import { HTTP_BAD_REQUEST } from "../config/constant";

const app = express();

/* Create Sale */
app.post('/sale/create', (req, res) => {
    let body = _.pick(req.body, ['user_email', 'amount']);
    User.findOne( { email: body.user_email, status : true }).exec((err, userDB) => {
        if(err || _.isEmpty(userDB)){
            return res.status(HTTP_BAD_REQUEST).json({
                status: false,
                message : err ? err : 'El usuario no existe o esta deshabilitado'
            })
        }

        let sale = new Sale({
            user : userDB._id,
            user_email : body.user_email,
            amount : body.amount,
        })
    
        sale.save((err, saleDB) => {
            if(err){
                return res.status(HTTP_BAD_REQUEST).json({
                    status: false,
                    message : err
                })
            }
            res.json({
                status: true,
                'sale' : saleDB
            });
        });

    })


})




module.exports = app;