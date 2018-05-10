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

    /*if(!(body.name && body.surname && body.email)){
        res.status(HTTP_BAD_REQUEST).json({
            status: false,
            message : "El nombre, apellido e email son obligatorios."
        })
    }else{   
        res.json({'user' : body});
    }*/

})

/* Edit User */
app.put('/user/edit', (req, res) => {
    res.json('Editar Usuario')
})

/* Delete User */
app.delete('/user/delete/:email', (req, res) => {
    let email = req.params.email;
    res.json(`Eliminar usuario: ${email}`)
})

/* Status User */
app.put('/user/status', (req, res) => {
    res.json('Se creo el usuario correctamente')
})

module.exports = app;