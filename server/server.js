import "./config/config";
import express from "express";
import bodyParser from "body-parser";
import { HTTP_BAD_REQUEST } from "./config/constant";

const app = express();
 
app.get('/', function (req, res) {
  res.json('Hello World como estas :DDDD')
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

/* ---------------------- */



/* Create User */
app.post('/user/create', (req, res) => {
    let body = req.body;

    if(!(body.name && body.surname && body.email)){
        res.status(HTTP_BAD_REQUEST).json({
            status: false,
            message : "El nombre, apellido e email son obligatorios."
        })
    }else{   
        res.json({'persona' : body});
    }

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


/* Validar Usuario */
app.put('/user/validate', (req, res) => {
    res.json('Se creo el usuario correctamente')
})


 
app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto:', process.env.PORT);
})