import express from "express";
import Sale from '../models/sale'
import User from '../models/user';
import _ from 'underscore';
import { HTTP_BAD_REQUEST } from "../config/constant";
import user from "../models/user";

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
            userDB.sales.push(saleDB);
            userDB.save()
            res.json({
                status: true,
                'sale' : saleDB
            });
        });
        

})


/* Delete Sale */
app.delete('/sale/delete/:id', (req, res) => {

    let id = req.params.id;
    let update  = { status: false}; 
    let options = { new: true };

    Sale.findByIdAndUpdate(id, update, options, (err, saleDB) =>{ 
        if(err || _.isEmpty(saleDB)){
            return res.status(HTTP_BAD_REQUEST).json({
                status: false,
                message : err ? err : 'La venta no existe'
            })
        }
        res.json({
            status: true,
            sale: saleDB,
        });
    });

})

/* View Sales */
app.get('/sale/:email',(req, res) => {
    let email = req.params.email;
    let query   = { user_email : email }; 
    Sale.find(query)
        .exec((err, saleDB) => {
        if(err || _.isEmpty(saleDB)){
            return res.status(HTTP_BAD_REQUEST).json({
                status: false,
                message : err ? err : 'No existen ventas'
            })
        }
        Sale.count(query, (err, count) => {
            res.json({
                status: true,
                sale: saleDB,
                count
            });

        })

    })
})

})


export default app;