import express from "express";
import bodyParser from "body-parser";

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
    res.json(body);
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


 
app.listen(3000, () => {
    console.log('Escuchando el puerto:', 3000);
})