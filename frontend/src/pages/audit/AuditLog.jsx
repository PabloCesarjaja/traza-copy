import { Link, useParams } from "react-router-dom";
import { Shield, Search, Filter, Download, UserRound, Globe, Clock, FilePlus2, FileText, MessageSquare, Edit2, LogIn, ListChecks, Trash2 } from "lucide-react";
import { findCaso, findUsuario, auditoria as allAuditoria } from "@/mockData/data";

const iconFor = (accion) => {
  if (accion.includes("CREADO")) return { Icon: FilePlus2, color: "text-emerald-700 bg-emerald-50" };
  if (accion.includes("ACTUALIZADO")) return { Icon: Edit2, color: "text-gold-600 bg-amber-50" };
  if (accion.includes("ELIMINADO") || accion.includes("ARCHIVADO")) return { Icon: Trash2, color: "text-red-700 bg-red-50" };
  if (accion.includes("DOCUMENTO")) return { Icon: FileText, color: "text-navy-800 bg-blue-50" };
  if (accion.includes("MENSAJE")) return { Icon: MessageSquare, color: "text-purple-700 bg-purple-50" };
  if (accion.includes("TAREA")) return { Icon: ListChecks, color: "text-cyan-700 bg-cyan-50" };
  if (accion.includes("SESION")) return { Icon: LogIn, color: "text-slate-700 bg-slate-50" };
  return { Icon: Shield, color: "text-[hsl(var(--muted-foreground))] bg-[hsl(var(--muted))]" };
};

export default function AuditLog() {
  const { id } = useParams();
  const c = findCaso(id) || findCaso("CA-2026-0142");
  const logs = allAuditoria.filter(a=>a.casoId===c.id);

  // group by date
  const grouped = logs.reduce((acc,l)=>{
    const day = l.fecha.split(" ")[0];
    (acc[day] = acc[day] || []).push(l);
    return acc;
  }, {});

  return (
    <div>
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-gold-600 mb-2">RF-06 · Auditoría del caso</div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="font-serif text-3xl">Registro de auditoría</h1>
            <span className="font-mono text-xs text-navy-800">{c.id}</span>
          </div>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-2">Cada evento es inmutable y firmado. Historial completo para cumplimiento normativo (ISO 27001 / Ley N° 29733).</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline"><Download size={14}/> Exportar CSV</button>
          <button className="btn btn-primary"><Download size={14}/> Informe PDF firmado</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Stat v={logs.length} l="Eventos totales" c="text-navy-800"/>
        <Stat v="4" l="Usuarios involucrados" c="text-gold-600"/>
        <Stat v="12 días" l="Período cubierto" c="text-emerald-700"/>
        <Stat v="100%" l="Integridad (hash)" c="text-emerald-700"/>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="flex-1 relative min-w-[260px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]"/>
          <input placeholder="Buscar por acción, usuario o IP..." className="field pl-10"/>
        </div>
        <select className="field w-auto"><option>Todas las acciones</option><option>CASO_CREADO</option><option>DOCUMENTO_SUBIDO</option><option>MENSAJE_ENVIADO</option></select>
        <select className="field w-auto"><option>Todos los usuarios</option><option>M. Ortiz</option><option>L. Herrera</option></select>
        <input type="date" className="field w-auto"/>
        <button className="btn btn-outline"><Filter size={14}/> Más filtros</button>
      </div>

      {/* Event log grouped by day */}
      <div className="card-paper overflow-hidden">
        {Object.entries(grouped).map(([day, items], gi) => (
          <div key={day}>
            <div className="px-5 py-2.5 bg-[hsl(var(--muted))] text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))] flex items-center gap-2 border-b border-[hsl(var(--line))]">
              <Clock size={11}/> {day} <span className="ml-auto font-normal normal-case tracking-normal">{items.length} evento{items.length>1?"s":""}</span>
            </div>

            {items.map((l,li)=>{
              const { Icon, color } = iconFor(l.accion);
              const u = findUsuario(l.actor);
              const time = l.fecha.split(" ")[1];
              return (
                <div key={l.id} className="px-5 py-4 border-b border-[hsl(var(--line))] last:border-b-0 flex gap-4 hover:bg-[hsl(var(--muted))/0.4]">
                  <div className={`w-10 h-10 rounded-md ${color} flex items-center justify-center shrink-0`}><Icon size={17}/></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-mono font-medium tracking-wide bg-navy-800 text-ivory px-1.5 py-0.5 rounded">{l.accion}</span>
                      <span className="text-sm font-medium">{l.descripcion}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-1.5 text-[11px] text-[hsl(var(--muted-foreground))] flex-wrap">
                      <span className="flex items-center gap-1.5"><div className="w-5 h-5 rounded-full bg-navy-800 text-gold-500 text-[9px] font-semibold flex items-center justify-center">{u?.avatar}</div>{u?.nombre}</span>
                      <span className="flex items-center gap-1"><Clock size={10}/> {time}</span>
                      <span className="flex items-center gap-1"><Globe size={10}/> {l.ip}</span>
                      <span className="font-mono">ID: {l.id}</span>
                    </div>
                  </div>
                  <button className="text-xs text-navy-800 hover:underline self-start">Ver detalle →</button>
                </div>
              );
            })}
          </div>
        ))}

        <div className="px-5 py-3 text-xs text-[hsl(var(--muted-foreground))] flex items-center justify-between bg-[hsl(var(--muted))/0.3]">
          <div className="flex items-center gap-2"><Shield size={12} className="text-emerald-700"/> Cadena de hash verificada · SHA-256</div>
          <span>Mostrando {logs.length} de {logs.length} eventos</span>
        </div>
      </div>
    </div>
  );
}

const Stat = ({ v, l, c }) => (
  <div className="card-paper p-5">
    <div className={`font-serif text-3xl ${c}`}>{v}</div>
    <div className="text-[11px] uppercase tracking-[0.16em] text-[hsl(var(--muted-foreground))] mt-1">{l}</div>
  </div>
);
