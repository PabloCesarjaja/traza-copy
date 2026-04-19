# constantes.py — Configuración del servicio OCR.

import os

PUERTO: int = int(os.getenv("PORT", "8000"))
ENTORNO: str = os.getenv("NODE_ENV", "development")
SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
SUPABASE_SERVICE_ROLE_KEY: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")

# Tamaño máximo de archivo permitido para OCR (en bytes)
MAX_TAMANO_BYTES: int = int(os.getenv("MAX_TAMANO_MB", "25")) * 1024 * 1024