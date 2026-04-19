# main.py
# Punto de entrada del servicio OCR de TRAZA-Legal.

from fastapi import FastAPI
from app.routers import ocr
from app.config.constants import PUERTO, ENTORNO

aplicacion = FastAPI(
    title="TRAZA-Legal OCR Service",
    description="Extracción de texto de documentos escaneados mediante Tesseract.",
    version="0.1.0",
)

aplicacion.include_router(ocr.enrutador, prefix="/ocr", tags=["OCR"])


@aplicacion.get("/health", tags=["Salud"])
def verificar_salud() -> dict:
    """Verifica que el servicio esté activo."""
    return {"estado": "activo", "servicio": "ocr-service", "entorno": ENTORNO}