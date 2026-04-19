# TRAZA-Legal · Mockups — PRD

## Problema original
Construir **19 mockups navegables de alta fidelidad** para el sistema TRAZA-Legal (gestión de casos legales, proyecto QA-SW, repo `PabloCesarjaja/traza-copy`), cubriendo los requerimientos funcionales RF-01 a RF-07. Estilo profesional legal clásico (azul marino + dorado, Playfair + Inter). 100% en español.

## Stack final (alineado con el repo traza-copy)
- **React** 18.3.0
- **React Router DOM** 6.30.3
- **Vite** 5.4 + TypeScript 5.6
- **Tailwind CSS** 3.4 (tokens custom: navy-950/900/800/700 + gold-600/500/400 + ivory)
- **lucide-react** 0.507 (iconos)
- Tipografías: Playfair Display (serif), Inter (sans), JetBrains Mono

## Personas
- **Abogado/a** → vista completa, gestiona casos asignados y del equipo
- **Asistente/Paralegal** → colabora en casos, crea tareas, sube documentos
- **Cliente** → portal simplificado, ve sus casos + progreso + documentos + mensajes
- **Administrador** → todos los casos del despacho, auditoría completa, restaurar archivados

## Requerimientos funcionales cubiertos (19 mockups)
- **RF-05 · Auth (4)**: `/registro`, `/login`, `/logout`, `/perfil`
- **RF-01 · Casos (5)**: `/casos`, `/casos/nuevo`, `/casos/:id`, `/casos/:id/editar`, `/casos/:id/eliminar`
- **RF-02 · Tareas (3)**: `/casos/:id/tareas`, `/casos/:id/tareas/nueva`, `/casos/:id/tareas/:taskId`
- **RF-03 · Documentos (2)**: `/casos/:id/documentos`, `/casos/:id/documentos/subir`
- **RF-04 · Mensajería (2)**: `/casos/:id/mensajes`, `/casos/:id/mensajes/nuevo`
- **RF-07 · Portal Cliente (2)**: `/portal/casos`, `/portal/casos/:id`
- **RF-06 · Auditoría (1)**: `/casos/:id/auditoria`
- Índice navegable: `/`

## Arquitectura de archivos
```
/app/frontend/
├── index.html              (raíz · Vite)
├── vite.config.ts          (port 3000, HMR wss:443, alias @/)
├── tsconfig.json
├── tailwind.config.cjs     (paleta navy/gold, fuentes)
├── postcss.config.cjs
├── package.json            (deps mínimas)
└── src/
    ├── main.tsx            (entry point)
    ├── App.tsx             (router con 19 rutas)
    ├── index.css           (tokens CSS + componentes .btn .chip .field .card-paper)
    ├── mockData/data.ts    (casos, tareas, docs, mensajes, usuarios, auditoría)
    ├── layouts/
    │   ├── AppLayout.tsx     (sidebar navy + topbar, despacho)
    │   ├── AuthLayout.tsx    (split screen con brand panel)
    │   └── ClientLayout.tsx  (portal cliente simplificado)
    └── pages/
        ├── MockupIndex.tsx   (catálogo hero con 19 tarjetas)
        ├── auth/ (4)
        ├── cases/ (5)
        ├── tasks/ (3)
        ├── documents/ (2)
        ├── messages/ (2)
        ├── client/ (2)
        └── audit/ (1)
```

## Implementación completa (Apr 19 2026)
- ✅ 19 mockups funcionales y navegables entre sí
- ✅ Diseño profesional legal clásico: navy + dorado, tipografía serif
- ✅ Datos mock realistas en español (expedientes peruanos, CAL, S/, materias)
- ✅ Switcher de roles en `/casos` para mostrar RF-01 según rol
- ✅ Kanban de tareas en 3 columnas (Pendiente / En progreso / Completada)
- ✅ Línea de tiempo procesal en portal cliente con hitos
- ✅ Auditoría agrupada por día con ícono por tipo de evento
- ✅ Chat layout estilo WhatsApp con burbujas y adjuntos
- ✅ Editor de mensaje con toolbar WYSIWYG mock
- ✅ Drag-and-drop visual para subida de documentos con queue
- ✅ Confirmación de soft delete con checkbox obligatorio
- ✅ `data-testid` en todos los elementos interactivos
- ✅ Build de producción limpio (0 errores TS · 80 kB JS gzip)
- ✅ Supervisor ejecutando `yarn start` (vite dev) en puerto 3000 correctamente

## Migración ejecutada (Apr 19 2026)
- Downgrade React 19 → 18.3.0, React Router 7 → 6.30.3
- CRA + craco → **Vite 5 + TypeScript 5**
- Verificación previa de compatibilidad: 0 problemas (APIs idénticas entre v18/v19 y RRv6/v7 en las features usadas)

## Backlog / futuro
### P1
- [ ] Hacer push al repo `traza-copy` (opciones: "Save to Github" de Emergent, o copiar a `apps/frontend` del monorepo y PR)
- [ ] Exportar PNG de los 19 mockups para documento de QA
- [ ] Conectar las pantallas con los microservicios reales del repo (auth-service, case-service, task-service, document-service, websocket-server, audit-service)

### P2
- [ ] Añadir modo oscuro (el dark token ya está presente en index.css para extender)
- [ ] i18n con react-intl para español/inglés
- [ ] Componentes shadcn cuando se use el backend real (Dialog, Toast, DropdownMenu, Command+K)
- [ ] Tests E2E con Playwright cubriendo los flujos críticos

## Next actions
1. Usuario decide cómo subir a GitHub (ver Finish)
2. Usuario prueba las 19 pantallas en el preview
3. Si aprueba, se puede exportar PNG y/o portar al repo traza-copy
