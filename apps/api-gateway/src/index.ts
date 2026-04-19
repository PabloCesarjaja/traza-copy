import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { PUERTO, ENTORNO } from './config/constants';

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));

// PROXY
app.use(
  '/api/v1/auth',
  createProxyMiddleware({
    target: 'http://127.0.0.1:3001', // Mantenemos 127.0.0.1 por seguridad
    changeOrigin: true,
    pathRewrite: {
      '^/api/v1/auth': '',
    },
  })
);

app.listen(PUERTO, () => {
  console.log(`[api-gateway] Escuchando en puerto ${PUERTO} (${ENTORNO})`);
});