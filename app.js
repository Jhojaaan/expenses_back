const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const app = express()

console.log('Entra');
require('dotenv').config()
console.log('Pasa');

const PORT = process.env.PORT || 5000
console.log('Puerto asignado');

//middlewares
app.use(express.json())
app.use(cors())

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))


const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()

// const express = require('express');
// const cors = require('cors');
// const app = express();

// app.use(cors());

// app.get('/', (req, res) => {
//   res.send('¡Hola desde el backend!');
// });

// app.listen(5000, () => {
//   console.log('Servidor iniciado en el puerto 5000');
// });
