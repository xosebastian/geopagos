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

    let query   = { email, delete : false }; 
    let update  = { name: body.name, 
                    surname : body.surname, 
                    adress : body.adress
                  }; 
    let options = { new: true }; 
    User.findOneAndUpdate(query, update, options, function(err, userDB){ 
        if(err || !userDB){
            return res.status(HTTP_BAD_REQUEST).json({
                status: false,
                message : err ? err : 'User Not Found'
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
    let body = req.body;

    let query   = { email, delete : false }; 
    let update  = { status: true}; 
    let options = { new: true }; 
    User.findOneAndUpdate(query, update, options, function(err, userDB){ 
        if(err || !userDB){
            return res.status(HTTP_BAD_REQUEST).json({
                status: false,
                message : err ? err : 'User Not Found'
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
    let body = req.body;

    let query   = { email }; 
    let update  = { delete: true}; 
    let options = { new: true }; 
    User.findOneAndUpdate(query, update, options, function(err, userDB){ 
        if(err || !userDB){
            return res.status(HTTP_BAD_REQUEST).json({
                status: false,
                message : err ? err : 'User Not Found'
            })
        }
        res.json({
            status: true,
            user: userDB,
        });
    });

})



module.exports = app;