import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Scale, User, Edit2, Trash2, FileText, ListChecks, MessageSquare, Shield, ExternalLink, Clock } from "lucide-react";
import { findCaso, findUsuario, tareas, documentos, mensajes, auditoria } from "@/mockData/data";

export default function CaseDetail() {
  const { id } = useParams();
  const c = findCaso(id) || findCaso("CA-2026-0142");
  const resp = findUsuario(c.responsable);
  const equipo = c.equipo.map(findUsuario);
  const estadoCls = c.estado==="En curso" ? "chip-info" : c.estado==="Audiencia programada" ? "chip-warn" : "chip-ok";

  const tabs = [
    { to: `/casos/${c.id}`,           label: "Resumen",     icon: Scale, active: true },
    { to: `/casos/${c.id}/tareas`,    label: "Tareas",      icon: ListChecks, badge: tareas.filter(t=>t.casoId===c.id).length },
    { to: `/casos/${c.id}/documentos`,label: "Documentos",  icon: FileText, badge: documentos.filter(d=>d.casoId===c.id).length },
    { to: `/casos/${c.id}/mensajes`,  label: "Mensajes",    icon: MessageSquare, badge: mensajes.filter(m=>m.casoId===c.id).length },
    { to: `/casos/${c.id}/auditoria`, label: "Auditoría",   icon: Shield },
  ];

  const timeline = [
    { fecha: "23 ene 2026", titulo: "Nueva resolución judicial", txt: "Se notificó la resolución 03 del expediente.", tipo: "info" },
    { fecha: "19 ene 2026", titulo: "Pericia técnica recibida", txt: "Luis Herrera subió la pericia estructural del inmueble.", tipo: "ok" },
    { fecha: "14 ene 2026", titulo: "Cambio de prioridad", txt: "La prioridad fue elevada de Media a Alta por solicitud del cliente.", tipo: "warn" },
    { fecha: "12 ene 2026", titulo: "Caso creado", txt: "Expediente aperturado por María Fernanda Ortiz.", tipo: "navy" },
  ];

  return (
    <div>
      <Link to="/casos" className="inline-flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-navy-800 mb-4"><ArrowLeft size={14}/> Volver a casos</Link>

      {/* Header */}
      <div className="card-paper p-7 mb-6">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="font-mono text-[11px] text-navy-800">{c.id}</span>
              <span className={`chip ${estadoCls}`}>{c.estado}</span>
              <span className="chip">{c.materia} · {c.subMateria}</span>
              <span className="chip chip-gold">Prioridad {c.prioridad}</span>
            </div>
            <h1 className="font-serif text-3xl leading-tight max-w-3xl">{c.titulo}</h1>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mt-3 max-w-2xl">{c.resumen}</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Link to={`/casos/${c.id}/editar`} data-testid="case-edit-btn" className="btn btn-outline"><Edit2 size={14}/> Editar</Link>
            <Link to={`/casos/${c.id}/eliminar`} data-testid="case-delete-btn" className="btn btn-ghost text-red-700 hover:bg-red-50"><Trash2 size={14}/> Eliminar</Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-7 pt-6 border-t border-[hsl(var(--line))]">
          <Meta icon={MapPin} label="Juzgado" value={c.juzgado}/>
          <Meta icon={Calendar} label="Próx. audiencia" value={c.proxAudiencia} accent/>
          <Meta icon={User} label="Cliente" value={c.cliente}/>
          <Meta icon={Scale} label="Cuantía" value={c.cuantia}/>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[hsl(var(--line))] mb-6 overflow-x-auto">
        {tabs.map(t=>{
          const Icon = t.icon;
          return (
            <Link key={t.label} to={t.to} className={`flex items-center gap-2 px-4 py-2.5 text-sm border-b-2 transition-colors ${t.active ? "border-gold-500 text-navy-800 font-medium" : "border-transparent text-[hsl(var(--muted-foreground))] hover:text-navy-800"}`}>
              <Icon size={14}/> {t.label}
              {t.badge ? <span className="text-[10px] bg-[hsl(var(--muted))] px-1.5 rounded-full">{t.badge}</span> : null}
            </Link>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-2 card-paper p-7">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-serif text-xl">Línea de tiempo</h3>
            <Link to={`/casos/${c.id}/auditoria`} className="text-xs text-navy-800 hover:underline">Ver auditoría completa →</Link>
          </div>
          <ul className="relative space-y-5 pl-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-[hsl(var(--line))]">
            {timeline.map((t)=>(
              <li key={t.titulo} className="relative">
                <span className={`absolute -left-6 top-1.5 w-3 h-3 rounded-full border-2 border-white ${t.tipo==="ok"?"bg-emerald-600":t.tipo==="warn"?"bg-gold-500":t.tipo==="info"?"bg-navy-700":"bg-navy-900"}`}/>
                <div className="flex items-baseline justify-between gap-3">
                  <div className="font-medium text-sm">{t.titulo}</div>
                  <div className="text-[11px] text-[hsl(var(--muted-foreground))] shrink-0"><Clock size={10} className="inline mr-1"/>{t.fecha}</div>
                </div>
                <div className="text-sm text-[hsl(var(--muted-foreground))] mt-0.5">{t.txt}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div className="card-paper p-6">
            <h3 className="font-serif text-lg mb-4">Progreso del caso</h3>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="font-serif text-4xl text-gold-600">{c.progreso}%</span>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">completado</span>
            </div>
            <div className="h-2 rounded-full bg-[hsl(var(--muted))] overflow-hidden mb-4">
              <div className="h-full bg-gold-500" style={{width:`${c.progreso}%`}}/>
            </div>
            <div className="text-xs text-[hsl(var(--muted-foreground))]">Etapa actual: probatoria — 4 de 7 hitos procesales alcanzados.</div>
          </div>

          <div className="card-paper p-6">
            <h3 className="font-serif text-lg mb-4">Equipo</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-navy-800 text-gold-500 text-sm font-semibold flex items-center justify-center">{resp?.avatar}</div>
                <div className="flex-1"><div className="text-sm font-medium">{resp?.nombre}</div><div className="text-[11px] text-[hsl(var(--muted-foreground))]">Responsable</div></div>
              </div>
              {equipo.filter(u=>u?.id!==resp?.id).map(u=>(
                <div key={u.id} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[hsl(var(--muted))] text-navy-800 text-sm font-semibold flex items-center justify-center">{u.avatar}</div>
                  <div className="flex-1"><div className="text-sm">{u.nombre}</div><div className="text-[11px] text-[hsl(var(--muted-foreground))]">{u.rol}</div></div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-paper p-6">
            <h3 className="font-serif text-lg mb-3">Expediente judicial</h3>
            <div className="text-xs text-[hsl(var(--muted-foreground))] mb-1">N° expediente</div>
            <div className="font-mono text-sm mb-3">{c.expediente}</div>
            <a href="#" className="text-xs text-navy-800 hover:text-gold-600 inline-flex items-center gap-1">Abrir en Poder Judicial <ExternalLink size={11}/></a>
          </div>
        </div>
      </div>
    </div>
  );
}

const Meta = ({ icon:Icon, label, value, accent }) => (
  <div className="flex items-start gap-3">
    <Icon size={16} className={`mt-0.5 ${accent ? "text-gold-600" : "text-[hsl(var(--muted-foreground))]"}`}/>
    <div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))]">{label}</div>
      <div className={`text-sm mt-0.5 ${accent ? "font-medium text-navy-800" : ""}`}>{value}</div>
    </div>
  </div>
);
