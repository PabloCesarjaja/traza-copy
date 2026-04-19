# Imagen multistage: etapa de build compilada y etapa de producción ligera.

FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

FROM base AS dependencias
RUN npm ci

FROM dependencias AS build
COPY tsconfig*.json ./
COPY src/ ./src/
RUN npm run build

FROM base AS produccion
RUN npm ci --only=production
COPY --from=build /app/dist ./dist
EXPOSE 3000
USER node
CMD ["node", "dist/index.js"]

