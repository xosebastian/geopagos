import express from "express";
import User from '../models/user';
import _ from 'underscore';
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
    let body = _.pick(req.body, ['name', 'surname', 'adress']);
    let options = { new: true }; 

    User.findOneAndUpdate({email : email} , body, options, (err, userDB) => { 
        if(err || _.isEmpty(userDB)){
            return res.status(HTTP_BAD_REQUEST).json({
                status: false,
                message : err ? err : 'El usuario no existe'
            })
        }
        res.json({
            status: true,
            user: userDB,
        });
    });

})


/* Status User */
app.put('/user/activate/:email', (req, res) => {

    let email = req.params.email;
    let body  = { status: true}; 
    let options = { new: false }; 

    User.findOneAndUpdate({email : email}  , body, options, (err, userDB) => { 
        if(err || _.isEmpty(userDB)){
            return res.status(HTTP_BAD_REQUEST).json({
                status: false,
                message : err ? err : 'El usuario no existe'
            })
        }
        res.json({
            status: true,
            user: userDB,
        });
    });
})


/* Delete User */
app.delete('/user/delete/:email', (req, res) => {

    let email = req.params.email;
    let body  = { status: false}; 
    let options = { new: true }; 

    User.findOneAndUpdate({email : email}, body, options, (err, userDB) =>{ 
        if(err || _.isEmpty(userDB)){
            return res.status(HTTP_BAD_REQUEST).json({
                status: false,
                message : err ? err : 'El usuario no existe'
            })
        }
        res.json({
            status: true,
            user: userDB,
        });
    });

})

app.get('/user',(req, res) => {
    User.find()
        .exec((err, users) => {
        if(err){
            return res.status(HTTP_BAD_REQUEST).json({
                status: false,
                message : err
            })
        }
        User.count((err, count) => {

            res.json({
                status: true,
                users,
                count
            });

        })

    })

})


module.exports = app;