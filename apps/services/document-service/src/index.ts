// index.ts — Punto de entrada del servicio document-service.

import express, { Request, Response, NextFunction } from 'express';
import { PUERTO, ENTORNO } from './config/constants';

const aplicacion = express();

aplicacion.use(express.json());
aplicacion.use(express.urlencoded({ extended: true }));

// Ruta de verificación de salud (requerida por Docker healthcheck)
aplicacion.get('/health', (_req: Request, res: Response) => {
    res.json({ estado: 'activo', servicio: 'document-service', entorno: ENTORNO });
});

// Manejo global de errores no controlados
aplicacion.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('[Error no controlado]', err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

aplicacion.listen(PUERTO, () => {
    console.log(`[document-service] Escuchando en puerto ${PUERTO} (${ENTORNO})`);
});

export default aplicacion;
