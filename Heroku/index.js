// index.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors);


// Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor backend en funcionamiento');
});

// Iniciar el servidor
const port = process.env.PORT || 3000;
const host = 'localhost'; 

app.listen(port, () => {
  console.log(`Servidor escuchando en http://${host}:${port}`);
});
