# Dockerfile — Servicio OCR (Python + FastAPI)
# Imagen ligera basada en python:3.12-slim.

FROM python:3.12-slim AS base
WORKDIR /app

# Instalar dependencias del sistema necesarias para Tesseract OCR
RUN apt-get update && apt-get install -y --no-install-recommends \
    tesseract-ocr \
    tesseract-ocr-spa \
    libgl1 \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

FROM base AS produccion
COPY app/ ./app/
EXPOSE 8000