// config/constantes.ts — task-service

/** Puerto en el que escucha el servicio. */
export const PUERTO = parseInt(process.env.PORT ?? '3003', 10);

/** Entorno de ejecución actual. */
export const ENTORNO = process.env.NODE_ENV ?? 'development';

/** URL de Supabase. */
export const SUPABASE_URL = process.env.SUPABASE_URL ?? '';

/** Clave de servicio de Supabase (uso exclusivo del backend). */
export const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

/** URL del servicio de auditoría. */
export const AUDIT_SERVICE_URL = process.env.AUDIT_SERVICE_URL ?? 'http://audit-service:3006';

/** URL de Redis. */
export const REDIS_URL = process.env.REDIS_URL ?? 'redis://redis:6379';
