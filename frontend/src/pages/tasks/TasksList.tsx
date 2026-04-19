import { Link, useParams } from "react-router-dom";
import { Plus, CheckCircle2, Circle, Clock, Filter, MoreHorizontal } from "lucide-react";
import { findCaso, findUsuario, tareas as allTareas } from "@/mockData/data";

export default function TasksList() {
  const { id } = useParams();
  const c = findCaso(id) || findCaso("CA-2026-0142");
  const tareas = allTareas.filter(t=>t.casoId===c.id);

  const cols = [
    { key: "Pendiente",   color: "border-t-gold-500" },
    { key: "En progreso", color: "border-t-navy-700" },
    { key: "Completada",  color: "border-t-emerald-600" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-2">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-gold-600 mb-2">RF-02 · Tareas del caso</div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="font-serif text-3xl">Tareas</h1>
            <span className="font-mono text-xs text-navy-800">{c.id}</span>
            <span className="text-sm text-[hsl(var(--muted-foreground))]">· {c.titulo.slice(0,40)}...</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline"><Filter size={14}/> Filtrar</button>
          <Link to={`/casos/${c.id}/tareas/nueva`} data-testid="tasks-new-btn" className="btn btn-gold"><Plus size={15}/> Nueva tarea</Link>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4 my-6">
        <Stat label="Total"       v={tareas.length} color="text-navy-800"/>
        <Stat label="Pendientes"  v={tareas.filter(t=>t.estado==="Pendiente").length} color="text-gold-600"/>
        <Stat label="En progreso" v={tareas.filter(t=>t.estado==="En progreso").length} color="text-navy-700"/>
        <Stat label="Completadas" v={tareas.filter(t=>t.completada).length} color="text-emerald-700"/>
      </div>

      {/* Kanban */}
      <div className="grid lg:grid-cols-3 gap-5">
        {cols.map(col=>{
          const items = tareas.filter(t=>t.estado===col.key);
          return (
            <div key={col.key} className={`card-paper p-4 border-t-4 ${col.color}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-lg">{col.key}</h3>
                  <span className="chip">{items.length}</span>
                </div>
                <button className="text-[hsl(var(--muted-foreground))] hover:text-navy-800"><MoreHorizontal size={16}/></button>
              </div>

              <div className="space-y-3">
                {items.map(t=>{
                  const asig = findUsuario(t.asignado);
                  const prioCls = t.prioridad==="Alta" ? "chip-err" : t.prioridad==="Media" ? "chip-warn" : "chip-info";
                  return (
                    <Link key={t.id} to={`/casos/${c.id}/tareas/${t.id}`} className="block p-4 rounded-md border border-[hsl(var(--line))] bg-[hsl(var(--paper))] hover:border-navy-800 transition-colors">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="font-mono text-[10px] text-gold-600">{t.id}</span>
                        <span className={`chip ${prioCls}`}>{t.prioridad}</span>
                      </div>
                      <div className="text-sm font-medium leading-snug flex items-start gap-2">
                        {t.completada ? <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5"/> : <Circle size={15} className="text-[hsl(var(--muted-foreground))] shrink-0 mt-0.5"/>}
                        <span className={t.completada ? "line-through text-[hsl(var(--muted-foreground))]" : ""}>{t.titulo}</span>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-[hsl(var(--line))]">
                        <div className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                          <Clock size={11}/> {t.vence}
                        </div>
                        <div className="w-6 h-6 rounded-full bg-navy-800 text-gold-500 text-[10px] font-semibold flex items-center justify-center" title={asig?.nombre}>{asig?.avatar}</div>
                      </div>
                    </Link>
                  );
                })}
                {items.length===0 && (
                  <div className="text-center text-xs text-[hsl(var(--muted-foreground))] py-8 border border-dashed border-[hsl(var(--line))] rounded-md">Sin tareas en esta columna</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const Stat = ({ label, v, color }) => (
  <div className="card-paper p-4">
    <div className={`font-serif text-3xl ${color}`}>{v}</div>
    <div className="text-[11px] uppercase tracking-[0.16em] text-[hsl(var(--muted-foreground))] mt-1">{label}</div>
  </div>
);
