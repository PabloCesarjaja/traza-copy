# routers/ocr.py
# Endpoints del servicio de reconocimiento óptico de caracteres.

import pytesseract
from PIL import Image
from fastapi import APIRouter, File, HTTPException, UploadFile
from io import BytesIO
from app.config.constants import MAX_TAMANO_BYTES

enrutador = APIRouter()


@enrutador.post("/extraer-texto")
async def extraer_texto(archivo: UploadFile = File(...)) -> dict:
    """
    Extrae el texto de una imagen o PDF escaneado.

    Parámetros:
        archivo: Imagen (PNG, JPG, TIFF) a procesar.

    Retorna:
        Diccionario con el texto extraído y metadatos básicos.
    """
    contenido = await archivo.read()

    if len(contenido) > MAX_TAMANO_BYTES:
        raise HTTPException(
            status_code=413,
            detail=f"El archivo supera el límite de {MAX_TAMANO_BYTES // (1024 * 1024)} MB.",
        )

    try:
        imagen = Image.open(BytesIO(contenido))
        textoExtraido = pytesseract.image_to_string(imagen, lang="spa")
    except Exception as error:
        raise HTTPException(
            status_code=422,
            detail=f"No fue posible procesar el archivo: {str(error)}",
        ) from error

    return {
        "nombreArchivo": archivo.filename,
        "texto": textoExtraido.strip(),
        "caracteres": len(textoExtraido.strip()),
    }