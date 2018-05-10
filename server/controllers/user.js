import express from "express";
import User from '../models/user';
import { HTTP_BAD_REQUEST } from "../config/constant";

const app = express();

/* Create User */
app.post('/user/create', (req, res) => {
    let body = req.body;

    let user = new User({
        name : body.name,
        surname : body.surname,
        email : body.email,
        adress : body.adress
    })

    user.save((err, userDB) => {
        if(err){
            return res.status(HTTP_BAD_REQUEST).json({
                status: false,
                message : err
            })
        }
        res.json({
            status: true,
            'user' : userDB
        });
    });
})

/* Edit User */
app.put('/user/edit/:email', (req, res) => {

    let email = req.params.email;
    let body = req.body;

    User.find( { $and: [{ email}, {delete : false}]} , (err, userDB)=>{
        if(err || userDB.length <= 0){
            return res.status(HTTP_BAD_REQUEST).json({
                status: false,
                message : err ? err : 'User Not Found'
            })
        }
        User.update({email: email}, {
            name: body.name, 
            surname: body.surname,
            adress: body.adress,
        }, (err, update) => {
            if(err){
                return res.status(HTTP_BAD_REQUEST).json({
                    status: false,
                    message : err
                })
            }
            res.json({
               status: true,
               update,
           });
        })
    })
})


/* Status User */
app.put('/user/activate/:email', (req, res) => {

    let email = req.params.email;

      User.find( { $and: [{ email}, {delete : false}]} , (err, userDB)=>{
        if(err || userDB.length <= 0){
            return res.status(HTTP_BAD_REQUEST).json({
                status: false,
                message : err ? err : 'User Not Found'
            })
        }
        User.update({email: email}, {
            status : true, 
        }, (err, update) => {
            if(err){
                return res.status(HTTP_BAD_REQUEST).json({
                    status: false,
                    message : err
                })
            }
            res.json({
               status: true,
               update,
           });
        })
    })
})


/* Delete User */
app.delete('/user/delete/:email', (req, res) => {

    let email = req.params.email;

    User.find( { $and: [{ email}, {delete : false}]} , (err, userDB)=>{
        if(err || userDB.length <= 0){
            return res.status(HTTP_BAD_REQUEST).json({
                status: false,
                message : err ? err : 'User Not Found'
            })
        }
        User.update({email: email}, {
            delete : true, 
        }, (err, update) => {
            if(err){
                return res.status(HTTP_BAD_REQUEST).json({
                    status: false,
                    message : err
                })
            }
            res.json({
               status: true,
               update,
           });
        })
    })
})



module.exports = app;