import "./config/config";

import express from "express";
import mongoose from 'mongoose';
import bodyParser from "body-parser";

import user from './controller/user';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(user);



mongoose.connect('mongodb://localhost:27017/GeoPagos', (err, rsp) => {

    if(err) throw err;
    console.log(' Base de datos: ', "\x1b[32m", 'ONLINE', "\x1b[0m");

}); 

app.listen(process.env.PORT, () => {
    console.log(' Escuchando puerto:', "\x1b[34m", process.env.PORT, "\x1b[0m");
})