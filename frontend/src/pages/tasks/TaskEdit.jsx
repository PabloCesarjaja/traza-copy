import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Save, CheckCircle2, Clock, MessageCircle, Paperclip, User } from "lucide-react";
import { tareas as allTareas, findCaso, findUsuario, usuarios, ROLES } from "@/mockData/data";

export default function TaskEdit() {
  const { id, taskId } = useParams();
  const c = findCaso(id) || findCaso("CA-2026-0142");
  const t = allTareas.find(x=>x.id===taskId) || allTareas[0];
  const asignables = usuarios.filter(u => u.rol===ROLES.ABOGADO || u.rol===ROLES.PARALEGAL);
  const L = ({ label }) => <label className="block text-[12px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))] mb-2">{label}</label>;

  const historial = [
    { a: "u-001", txt: "creó la tarea",                      f: "13 ene · 11:02" },
    { a: "u-001", txt: "asignó la tarea a Luis Herrera",     f: "13 ene · 11:03" },
    { a: "u-002", txt: "cambió el estado: Pendiente → En progreso", f: "16 ene · 08:45" },
    { a: "u-002", txt: "añadió comentario",                  f: "18 ene · 14:20" },
  ];

  const comentarios = [
    { a: "u-002", txt: "Dra., ya tengo el borrador v1. ¿Podemos revisarlo juntos mañana después de la reunión con el cliente?", f: "18 ene, 14:20" },
    { a: "u-001", txt: "Perfecto Luis, nos vemos a las 10:30. Envíame el link del documento.", f: "18 ene, 15:05" },
  ];

  return (
    <div className="max-w-6xl">
      <Link to={`/casos/${c.id}/tareas`} className="inline-flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-navy-800 mb-5"><ArrowLeft size={14}/> Volver a tareas</Link>

      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-gold-600 mb-2">RF-02 · Actualizar tarea</div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="font-mono text-[11px] text-gold-600">{t.id}</span>
            <span className="chip chip-info">{t.estado}</span>
            <span className="chip chip-err">Prioridad {t.prioridad}</span>
          </div>
          <h1 className="font-serif text-3xl">{t.titulo}</h1>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline"><CheckCircle2 size={15}/> Marcar completada</button>
          <button data-testid="task-edit-save" className="btn btn-gold"><Save size={15}/> Guardar</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card-paper p-7 space-y-5">
            <div><L label="Título"/><input className="field" defaultValue={t.titulo}/></div>
            <div><L label="Descripción"/><textarea className="field min-h-[100px]" defaultValue="Redactar escrito de subsanación atendiendo las observaciones 1 y 3 del auto admisorio, incorporando el medio probatorio adicional solicitado."/></div>
            <div className="grid grid-cols-2 gap-4">
              <div><L label="Estado"/><select className="field" defaultValue={t.estado}><option>Pendiente</option><option>En progreso</option><option>En revisión</option><option>Completada</option></select></div>
              <div><L label="Prioridad"/><select className="field" defaultValue={t.prioridad}><option>Baja</option><option>Media</option><option>Alta</option></select></div>
              <div><L label="Asignado a"/><select className="field" defaultValue={findUsuario(t.asignado)?.nombre}>{asignables.map(u=><option key={u.id}>{u.nombre}</option>)}</select></div>
              <div><L label="Vencimiento"/><input type="date" className="field" defaultValue={t.vence}/></div>
            </div>
          </div>

          {/* Comentarios */}
          <div className="card-paper p-7">
            <div className="flex items-center gap-2 mb-5"><MessageCircle size={16} className="text-gold-600"/><h3 className="font-serif text-xl">Comentarios</h3></div>
            <div className="space-y-4">
              {comentarios.map((c,i)=>{
                const u = findUsuario(c.a);
                return (
                  <div key={i} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-navy-800 text-gold-500 text-xs font-semibold flex items-center justify-center shrink-0">{u.avatar}</div>
                    <div className="flex-1 bg-[hsl(var(--muted))] rounded-md p-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-medium">{u.nombre}</span>
                        <span className="text-[11px] text-[hsl(var(--muted-foreground))]">{c.f}</span>
                      </div>
                      <p className="text-sm mt-1">{c.txt}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gold-500 text-navy-950 text-xs font-semibold flex items-center justify-center shrink-0">MO</div>
              <div className="flex-1">
                <textarea className="field min-h-[70px]" placeholder="Escribe un comentario..."/>
                <div className="flex justify-between mt-2">
                  <button className="btn btn-ghost text-xs"><Paperclip size={13}/> Adjuntar</button>
                  <button className="btn btn-primary text-xs">Comentar</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: Actividad */}
        <div className="card-paper p-6 h-fit">
          <div className="flex items-center gap-2 mb-4"><Clock size={16} className="text-gold-600"/><h3 className="font-serif text-lg">Historial</h3></div>
          <ul className="relative space-y-4 pl-5 before:content-[''] before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-px before:bg-[hsl(var(--line))]">
            {historial.map((h,i)=>{
              const u = findUsuario(h.a);
              return (
                <li key={i} className="relative text-sm">
                  <span className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-navy-700 border-2 border-white"/>
                  <div><b>{u.nombre.split(" ")[0]}</b> {h.txt}</div>
                  <div className="text-[11px] text-[hsl(var(--muted-foreground))] mt-0.5">{h.f}</div>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 pt-4 border-t border-[hsl(var(--line))] text-xs text-[hsl(var(--muted-foreground))]">
            <div className="flex items-center gap-2"><User size={12}/> Creada por M. Ortiz</div>
            <div className="flex items-center gap-2 mt-1"><Clock size={12}/> hace 10 días</div>
          </div>
        </div>
      </div>
    </div>
  );
}
