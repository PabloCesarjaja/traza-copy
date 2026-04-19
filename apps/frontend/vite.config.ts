// vite.config.ts — Configuración de Vite para TRAZA-Legal frontend.

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://api-gateway:3000',
                changeOrigin: true,
                rewrite: (rutaUrl) => rutaUrl.replace(/^\/api/, ''),
            },
            '/ws': {
                target: 'ws://websocket-server:3005',
                ws: true,
            },
        },
    },
});
