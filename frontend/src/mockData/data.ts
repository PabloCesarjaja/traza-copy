// Mock data for TRAZA-Legal mockups. All fictitious.
export const ROLES = {
  ABOGADO: "Abogado",
  PARALEGAL: "Asistente/Paralegal",
  CLIENTE: "Cliente",
  ADMIN: "Administrador",
};

export const currentUser = {
  id: "u-001",
  nombre: "María Fernanda Ortiz",
  correo: "mortiz@trazalegal.pe",
  rol: ROLES.ABOGADO,
  colegiatura: "CAL 45872",
  telefono: "+51 987 654 321",
  despacho: "Ortiz & Asociados",
  avatar: "MO",
};

export const usuarios = [
  { id: "u-001", nombre: "María Fernanda Ortiz", rol: ROLES.ABOGADO,   avatar: "MO" },
  { id: "u-002", nombre: "Luis Herrera Salas",   rol: ROLES.PARALEGAL, avatar: "LH" },
  { id: "u-003", nombre: "Rosa Pineda Mora",     rol: ROLES.PARALEGAL, avatar: "RP" },
  { id: "u-004", nombre: "Carlos Benavides",     rol: ROLES.ABOGADO,   avatar: "CB" },
  { id: "u-005", nombre: "Inmobiliaria Altuna",  rol: ROLES.CLIENTE,   avatar: "IA" },
  { id: "u-006", nombre: "Jorge Mendoza Ríos",   rol: ROLES.CLIENTE,   avatar: "JM" },
  { id: "u-007", nombre: "Admin del Sistema",    rol: ROLES.ADMIN,     avatar: "AD" },
];

export const casos = [
  {
    id: "CA-2026-0142",
    titulo: "Mendoza Ríos c/ Inmobiliaria Altuna S.A.",
    materia: "Civil",
    subMateria: "Incumplimiento contractual",
    estado: "En curso",
    prioridad: "Alta",
    cliente: "Jorge Mendoza Ríos",
    clienteId: "u-006",
    contraparte: "Inmobiliaria Altuna S.A.",
    juzgado: "3° Juzgado Civil de Lima",
    expediente: "00845-2026-0-1801-JR-CI-03",
    responsable: "u-001",
    equipo: ["u-001", "u-002"],
    cuantia: "S/ 285,000",
    fechaApertura: "2026-01-12",
    proxAudiencia: "2026-02-04 09:30",
    progreso: 62,
    resumen: "Resolución de contrato de compraventa por entrega tardía y vicios ocultos del inmueble ubicado en Surco. Se demanda restitución e indemnización.",
    eliminado: false,
  },
  {
    id: "CA-2026-0138",
    titulo: "Altuna S.A. — Defensa laboral colectiva",
    materia: "Laboral",
    subMateria: "Despido arbitrario",
    estado: "Audiencia programada",
    prioridad: "Media",
    cliente: "Inmobiliaria Altuna S.A.",
    clienteId: "u-005",
    contraparte: "Sindicato de Trabajadores Altuna",
    juzgado: "7° Juzgado Laboral NLPT",
    expediente: "01129-2026-0-1801-JR-LA-07",
    responsable: "u-004",
    equipo: ["u-004", "u-003"],
    cuantia: "S/ 1,120,000",
    fechaApertura: "2025-11-03",
    proxAudiencia: "2026-01-28 10:00",
    progreso: 45,
    resumen: "Proceso laboral por reposición de 14 trabajadores y pago de beneficios sociales adeudados.",
    eliminado: false,
  },
  {
    id: "CA-2026-0130",
    titulo: "Herrera vs. Municipalidad de Miraflores",
    materia: "Administrativo",
    subMateria: "Contencioso administrativo",
    estado: "En curso",
    prioridad: "Baja",
    cliente: "Luis Herrera Salas",
    clienteId: "u-002",
    contraparte: "Municipalidad de Miraflores",
    juzgado: "2° Juzgado Contencioso",
    expediente: "00552-2026-0-1801-JR-CA-02",
    responsable: "u-001",
    equipo: ["u-001"],
    cuantia: "S/ 45,000",
    fechaApertura: "2025-09-21",
    proxAudiencia: "2026-02-18 14:30",
    progreso: 80,
    resumen: "Impugnación de resolución municipal sobre licencia de construcción denegada.",
    eliminado: false,
  },
  {
    id: "CA-2025-0998",
    titulo: "Sucesión Quispe Valdivia",
    materia: "Sucesiones",
    subMateria: "Sucesión intestada",
    estado: "Cerrado",
    prioridad: "Media",
    cliente: "Familia Quispe",
    clienteId: "u-006",
    contraparte: "—",
    juzgado: "Notaría Linares",
    expediente: "N-2025-4421",
    responsable: "u-004",
    equipo: ["u-004", "u-002"],
    cuantia: "S/ 520,000",
    fechaApertura: "2025-05-14",
    proxAudiencia: "—",
    progreso: 100,
    resumen: "Declaratoria de herederos e inscripción registral concluidas.",
    eliminado: false,
  },
  {
    id: "CA-2025-0871",
    titulo: "Borrador — Asesoría tributaria MYPE",
    materia: "Tributario",
    subMateria: "Consulta",
    estado: "Archivado",
    prioridad: "Baja",
    cliente: "MYPE Sol Andino",
    clienteId: "u-005",
    contraparte: "SUNAT",
    juzgado: "—",
    expediente: "—",
    responsable: "u-001",
    equipo: ["u-001"],
    cuantia: "S/ 12,000",
    fechaApertura: "2025-03-02",
    proxAudiencia: "—",
    progreso: 20,
    resumen: "Borrador archivado por solicitud del cliente.",
    eliminado: true,
  },
];

export const tareas = [
  { id: "T-0421", casoId: "CA-2026-0142", titulo: "Redactar escrito de subsanación", asignado: "u-002", estado: "En progreso", prioridad: "Alta",  vence: "2026-01-26", completada: false },
  { id: "T-0422", casoId: "CA-2026-0142", titulo: "Notificar a contraparte vía cédula", asignado: "u-001", estado: "Pendiente",   prioridad: "Alta",  vence: "2026-01-28", completada: false },
  { id: "T-0423", casoId: "CA-2026-0142", titulo: "Preparar alegatos para audiencia", asignado: "u-001", estado: "Pendiente",   prioridad: "Media", vence: "2026-02-02", completada: false },
  { id: "T-0419", casoId: "CA-2026-0142", titulo: "Reunión con el cliente (informe)", asignado: "u-002", estado: "Completada",  prioridad: "Media", vence: "2026-01-18", completada: true  },
  { id: "T-0418", casoId: "CA-2026-0142", titulo: "Revisar pericia técnica del inmueble", asignado: "u-001", estado: "Completada", prioridad: "Alta", vence: "2026-01-15", completada: true },
  { id: "T-0430", casoId: "CA-2026-0138", titulo: "Compilar planillas 2024-2025", asignado: "u-003", estado: "En progreso", prioridad: "Alta",  vence: "2026-01-24", completada: false },
  { id: "T-0431", casoId: "CA-2026-0138", titulo: "Coordinar testigos", asignado: "u-004", estado: "Pendiente", prioridad: "Media", vence: "2026-01-26", completada: false },
];

export const documentos = [
  { id: "D-1201", casoId: "CA-2026-0142", nombre: "Demanda_principal_firmada.pdf", tipo: "pdf", peso: "2.4 MB", subidoPor: "u-001", fecha: "2026-01-12 09:18", etiqueta: "Demanda" },
  { id: "D-1202", casoId: "CA-2026-0142", nombre: "Contrato_compraventa_original.pdf", tipo: "pdf", peso: "5.1 MB", subidoPor: "u-001", fecha: "2026-01-12 09:25", etiqueta: "Prueba" },
  { id: "D-1203", casoId: "CA-2026-0142", nombre: "Pericia_tecnica_inmueble.pdf", tipo: "pdf", peso: "8.9 MB", subidoPor: "u-002", fecha: "2026-01-14 16:02", etiqueta: "Pericia" },
  { id: "D-1204", casoId: "CA-2026-0142", nombre: "Fotografias_danos.zip", tipo: "zip", peso: "22.7 MB", subidoPor: "u-002", fecha: "2026-01-14 16:10", etiqueta: "Prueba" },
  { id: "D-1205", casoId: "CA-2026-0142", nombre: "Oficio_juzgado_resolucion_03.pdf", tipo: "pdf", peso: "312 KB", subidoPor: "u-001", fecha: "2026-01-19 11:47", etiqueta: "Resolución" },
  { id: "D-1206", casoId: "CA-2026-0142", nombre: "Minuta_reunion_cliente.docx", tipo: "docx", peso: "58 KB", subidoPor: "u-002", fecha: "2026-01-18 18:30", etiqueta: "Interno" },
];

export const mensajes = [
  { id: "M-01", casoId: "CA-2026-0142", autor: "u-001", cuerpo: "Buenas tardes don Jorge, le comparto el escrito de subsanación para su revisión antes de presentarlo el viernes.", fecha: "2026-01-22 14:12", adjuntos: ["Escrito_subsanacion_v3.pdf"] },
  { id: "M-02", casoId: "CA-2026-0142", autor: "u-006", cuerpo: "Perfecto Dra. Ortiz. Revisaré esta noche y le confirmo mañana temprano. ¿El punto 4 quedó como conversamos?", fecha: "2026-01-22 18:40", adjuntos: [] },
  { id: "M-03", casoId: "CA-2026-0142", autor: "u-002", cuerpo: "Dra., ya coordiné la notificación por cédula. Quedó programada para el 28/01 a primera hora.", fecha: "2026-01-23 09:02", adjuntos: [] },
  { id: "M-04", casoId: "CA-2026-0142", autor: "u-001", cuerpo: "Gracias Luis. Por favor confirma también la disponibilidad de sala para el 04/02.", fecha: "2026-01-23 09:15", adjuntos: [] },
  { id: "M-05", casoId: "CA-2026-0142", autor: "u-006", cuerpo: "Dra., confirmado el punto 4. Adjunto el correo que recibí del representante de Altuna.", fecha: "2026-01-23 11:30", adjuntos: ["correo_altuna_23-01.eml"] },
];

export const auditoria = [
  { id: "A-9801", casoId: "CA-2026-0142", actor: "u-001", accion: "CASO_CREADO",        descripcion: "Creación del caso",                              fecha: "2026-01-12 09:15:22", ip: "190.235.12.4" },
  { id: "A-9802", casoId: "CA-2026-0142", actor: "u-001", accion: "DOCUMENTO_SUBIDO",   descripcion: "Subió Demanda_principal_firmada.pdf",            fecha: "2026-01-12 09:18:45", ip: "190.235.12.4" },
  { id: "A-9803", casoId: "CA-2026-0142", actor: "u-002", accion: "TAREA_CREADA",       descripcion: "Creó tarea T-0419",                              fecha: "2026-01-13 11:02:08", ip: "190.235.12.9" },
  { id: "A-9804", casoId: "CA-2026-0142", actor: "u-001", accion: "CASO_ACTUALIZADO",   descripcion: "Cambió prioridad: Media → Alta",                 fecha: "2026-01-14 15:30:11", ip: "190.235.12.4" },
  { id: "A-9805", casoId: "CA-2026-0142", actor: "u-002", accion: "DOCUMENTO_SUBIDO",   descripcion: "Subió Pericia_tecnica_inmueble.pdf",             fecha: "2026-01-14 16:02:33", ip: "190.235.12.9" },
  { id: "A-9806", casoId: "CA-2026-0142", actor: "u-001", accion: "MENSAJE_ENVIADO",    descripcion: "Envió mensaje al cliente (id M-01)",             fecha: "2026-01-22 14:12:59", ip: "190.235.12.4" },
  { id: "A-9807", casoId: "CA-2026-0142", actor: "u-006", accion: "MENSAJE_ENVIADO",    descripcion: "Cliente respondió mensaje (id M-02)",            fecha: "2026-01-22 18:40:02", ip: "200.48.77.15" },
  { id: "A-9808", casoId: "CA-2026-0142", actor: "u-001", accion: "TAREA_ACTUALIZADA",  descripcion: "Marcó T-0418 como Completada",                   fecha: "2026-01-15 09:10:14", ip: "190.235.12.4" },
  { id: "A-9809", casoId: "CA-2026-0142", actor: "u-002", accion: "DOCUMENTO_SUBIDO",   descripcion: "Subió Fotografias_danos.zip",                    fecha: "2026-01-14 16:10:27", ip: "190.235.12.9" },
  { id: "A-9810", casoId: "CA-2026-0142", actor: "u-001", accion: "INICIO_SESION",      descripcion: "Inicio de sesión exitoso",                       fecha: "2026-01-23 08:40:01", ip: "190.235.12.4" },
];

export const findCaso    = (id) => casos.find(c => c.id === id);
export const findUsuario = (id) => usuarios.find(u => u.id === id);

// 19 mockups catalog for index page
export const mockupsCatalog = [
  { grupo: "RF-05 · Autenticación", items: [
    { n: "01", nombre: "Registro de usuario",   path: "/registro",       rf: "RF-05" },
    { n: "02", nombre: "Inicio de sesión",      path: "/login",          rf: "RF-05" },
    { n: "03", nombre: "Cerrar sesión",         path: "/logout",         rf: "RF-05" },
    { n: "04", nombre: "Perfil del usuario",    path: "/perfil",         rf: "RF-05" },
  ]},
  { grupo: "RF-01 · Gestión de casos", items: [
    { n: "05", nombre: "Listar casos (según rol)", path: "/casos",                    rf: "RF-01" },
    { n: "06", nombre: "Crear caso",               path: "/casos/nuevo",              rf: "RF-01" },
    { n: "07", nombre: "Detalle de caso",          path: "/casos/CA-2026-0142",       rf: "RF-01" },
    { n: "08", nombre: "Actualizar caso",          path: "/casos/CA-2026-0142/editar",rf: "RF-01" },
    { n: "09", nombre: "Eliminar (soft delete) caso", path: "/casos/CA-2026-0142/eliminar", rf: "RF-01" },
  ]},
  { grupo: "RF-02 · Tareas", items: [
    { n: "10", nombre: "Tareas del caso",       path: "/casos/CA-2026-0142/tareas",           rf: "RF-02" },
    { n: "11", nombre: "Crear tarea",           path: "/casos/CA-2026-0142/tareas/nueva",     rf: "RF-02" },
    { n: "12", nombre: "Actualizar tarea",      path: "/casos/CA-2026-0142/tareas/T-0421",    rf: "RF-02" },
  ]},
  { grupo: "RF-03 · Documentos", items: [
    { n: "13", nombre: "Documentos del caso",   path: "/casos/CA-2026-0142/documentos",        rf: "RF-03" },
    { n: "14", nombre: "Subir documento",       path: "/casos/CA-2026-0142/documentos/subir",  rf: "RF-03" },
  ]},
  { grupo: "RF-04 · Mensajería", items: [
    { n: "15", nombre: "Mensajes del caso",     path: "/casos/CA-2026-0142/mensajes",          rf: "RF-04" },
    { n: "16", nombre: "Enviar mensaje",        path: "/casos/CA-2026-0142/mensajes/nuevo",    rf: "RF-04" },
  ]},
  { grupo: "RF-07 · Portal Cliente", items: [
    { n: "17", nombre: "Portal cliente: sus casos", path: "/portal/casos",                   rf: "RF-07" },
    { n: "18", nombre: "Portal: detalle de caso",   path: "/portal/casos/CA-2026-0142",      rf: "RF-07" },
  ]},
  { grupo: "RF-06 · Auditoría", items: [
    { n: "19", nombre: "Auditoría del caso",    path: "/casos/CA-2026-0142/auditoria",         rf: "RF-06" },
  ]},
];
