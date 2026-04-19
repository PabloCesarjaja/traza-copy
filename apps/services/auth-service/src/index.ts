import express from 'express';
import { PUERTO, ENTORNO } from './config/constants';

const app = express();
app.listen(PUERTO, () => {
  console.log(`[auth-service] Entorno: ${ENTORNO}`);
  console.log(`[auth-service] Escuchando en puerto ${PUERTO}`);
});

// Middleware vital para que lea los datos del frontend
app.use(express.json());

// Ruta login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  console.log(`[auth-service] ¡Éxito! Intento de login recibido para: ${email}`);
  
  res.status(200).json({
    mensaje: "¡Conexión Frontend -> Gateway -> Auth Service completada con éxito!",
    usuario: email
  });
});