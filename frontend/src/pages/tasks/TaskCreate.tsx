import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, Paperclip } from "lucide-react";
import { findCaso, usuarios, ROLES } from "@/mockData/data";

export default function TaskCreate() {
  const { id } = useParams();
  const c = findCaso(id) || findCaso("CA-2026-0142");
  const asignables = usuarios.filter(u => u.rol===ROLES.ABOGADO || u.rol===ROLES.PARALEGAL);
  const L = ({ label }) => <label className="block text-[12px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))] mb-2">{label}</label>;

  return (
    <div className="max-w-3xl">
      <Link to={`/casos/${c.id}/tareas`} className="inline-flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-navy-800 mb-5"><ArrowLeft size={14}/> Volver a tareas</Link>

      <div className="text-[11px] uppercase tracking-[0.22em] text-gold-600 mb-2">RF-02 · Crear tarea</div>
      <h1 className="font-serif text-4xl title-underline mb-2">Nueva tarea</h1>
      <p className="text-sm text-[hsl(var(--muted-foreground))] mb-8">En el caso <span className="font-mono text-navy-800">{c.id}</span> — {c.titulo}</p>

      <div className="card-paper p-7 space-y-5">
        <div>
          <L label="Título de la tarea"/>
          <input data-testid="task-title" className="field" placeholder="Ej. Redactar escrito de subsanación"/>
        </div>

        <div>
          <L label="Descripción"/>
          <textarea className="field min-h-[110px]" placeholder="Describe el objetivo, entregables esperados y contexto relevante..."/>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <L label="Asignado a"/>
            <select className="field" defaultValue="Luis Herrera Salas">
              {asignables.map(u=><option key={u.id}>{u.nombre}</option>)}
            </select>
          </div>
          <div>
            <L label="Fecha de vencimiento"/>
            <input type="date" className="field" defaultValue="2026-01-28"/>
          </div>
          <div>
            <L label="Prioridad"/>
            <div className="flex gap-2">
              {["Baja","Media","Alta"].map((p,i)=>(
                <label key={p} className={`flex-1 border rounded-md p-2 text-center text-sm cursor-pointer ${i===2 ? "border-red-700 bg-red-50 text-red-700 font-medium" : "border-[hsl(var(--line))]"}`}>
                  <input type="radio" name="prio" defaultChecked={i===2} className="sr-only"/>{p}
                </label>
              ))}
            </div>
          </div>
          <div>
            <L label="Estado inicial"/>
            <select className="field"><option>Pendiente</option><option>En progreso</option></select>
          </div>
        </div>

        <div>
          <L label="Etiquetas"/>
          <div className="flex flex-wrap gap-2">
            {["Escrito","Urgente","Audiencia"].map(t=><span key={t} className="chip chip-gold">{t} ×</span>)}
            <button className="chip">+ Añadir</button>
          </div>
        </div>

        <div>
          <L label="Archivos adjuntos"/>
          <button className="btn btn-outline"><Paperclip size={14}/> Añadir archivo</button>
        </div>

        <label className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] pt-3 border-t border-[hsl(var(--line))]">
          <input type="checkbox" defaultChecked className="accent-[hsl(var(--navy-800))]"/> Notificar al asignado por correo
        </label>
      </div>

      <div className="flex gap-3 mt-6">
        <Link to={`/casos/${c.id}/tareas`} className="btn btn-outline flex-1">Cancelar</Link>
        <button data-testid="task-create-submit" className="btn btn-gold flex-1"><Check size={15}/> Crear tarea</button>
      </div>
    </div>
  );
}
