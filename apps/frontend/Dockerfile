# Dockerfile — Frontend React + Vite
# Etapa "produccion": imagen Nginx ligera con el bundle compilado.
# Etapa "desarrollo": hot-reload con Vite dev server.

FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

FROM base AS dependencias
RUN npm ci

# ─── Etapa de build para producción ──────────────────────────────────────────
FROM dependencias AS build
COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS produccion
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# ─── Etapa de desarrollo (hot-reload) ────────────────────────────────────────
FROM dependencias AS desarrollo
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
