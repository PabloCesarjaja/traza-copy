import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Save, History, AlertCircle } from "lucide-react";
import { findCaso } from "@/mockData/data";

export default function CaseEdit() {
  const { id } = useParams();
  const c = findCaso(id) || findCaso("CA-2026-0142");

  const L = ({ label, hint }) => (
    <div className="flex items-center gap-2 mb-2">
      <label className="text-[12px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))]">{label}</label>
      {hint && <span className="text-[10px] text-gold-600 font-mono">•{hint}</span>}
    </div>
  );

  return (
    <div className="max-w-5xl">
      <Link to={`/casos/${c.id}`} className="inline-flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-navy-800 mb-5"><ArrowLeft size={14}/> Volver al caso</Link>

      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-gold-600 mb-2">RF-01 · Actualizar caso</div>
          <h1 className="font-serif text-4xl title-underline">Editar caso</h1>
          <div className="flex items-center gap-2 mt-3">
            <span className="font-mono text-xs text-navy-800">{c.id}</span>
            <span className="chip">{c.materia}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Link to={`/casos/${c.id}`} className="btn btn-outline">Cancelar</Link>
          <button data-testid="case-edit-save" className="btn btn-gold"><Save size={15}/> Guardar cambios</button>
        </div>
      </div>

      {/* Alert de cambios pendientes */}
      <div className="flex items-start gap-3 p-4 rounded-md bg-[hsl(var(--gold-500)/0.1)] border border-[hsl(var(--gold-500)/0.35)] mb-6">
        <AlertCircle size={18} className="text-gold-600 mt-0.5 shrink-0"/>
        <div>
          <div className="text-sm font-medium">Tienes 3 cambios sin guardar</div>
          <div className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">Todos los cambios quedarán registrados en la auditoría del caso (RF-06).</div>
        </div>
      </div>

      <div className="card-paper p-7 space-y-5">
        <div>
          <L label="Título" hint="modificado"/>
          <input className="field" defaultValue={c.titulo}/>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div><L label="Materia"/><select className="field" defaultValue={c.materia}><option>Civil</option><option>Laboral</option><option>Administrativo</option></select></div>
          <div><L label="Sub-materia" hint="modificado"/><input className="field" defaultValue={c.subMateria}/></div>
          <div><L label="Juzgado"/><input className="field" defaultValue={c.juzgado}/></div>
          <div><L label="Expediente"/><input className="field font-mono text-[12px]" defaultValue={c.expediente}/></div>
          <div>
            <L label="Estado"/>
            <select className="field" defaultValue={c.estado}><option>En curso</option><option>Audiencia programada</option><option>Suspendido</option><option>Cerrado</option></select>
          </div>
          <div>
            <L label="Prioridad" hint="modificado"/>
            <div className="flex gap-2">
              {["Baja","Media","Alta"].map((p)=>(
                <label key={p} className={`flex-1 border rounded-md p-2 text-center text-sm cursor-pointer ${c.prioridad===p ? "border-navy-800 bg-navy-800 text-ivory" : "border-[hsl(var(--line))]"}`}>{p}</label>
              ))}
            </div>
          </div>
          <div><L label="Cuantía"/><input className="field" defaultValue={c.cuantia}/></div>
          <div><L label="Próx. audiencia"/><input type="datetime-local" className="field" defaultValue="2026-02-04T09:30"/></div>
        </div>

        <div>
          <L label="Resumen"/>
          <textarea className="field min-h-[110px]" defaultValue={c.resumen}/>
        </div>
      </div>

      {/* Revision history */}
      <div className="card-paper p-7 mt-6">
        <div className="flex items-center gap-2 mb-4"><History size={16} className="text-gold-600"/><h3 className="font-serif text-xl">Historial de revisiones</h3></div>
        <ul className="divide-y divide-[hsl(var(--line))] text-sm">
          {[
            { f:"23 ene 2026 · 09:15", u:"M. Ortiz", c:"Cambió prioridad: Media → Alta" },
            { f:"19 ene 2026 · 16:02", u:"L. Herrera", c:"Actualizó próxima audiencia" },
            { f:"14 ene 2026 · 11:30", u:"M. Ortiz", c:"Añadió resumen extendido" },
          ].map(r=>(
            <li key={r.f} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-navy-800 text-gold-500 text-[10px] font-semibold flex items-center justify-center">{r.u.split(".")[0][0]+r.u.split(" ")[1][0]}</div>
                <div>
                  <div>{r.c}</div>
                  <div className="text-[11px] text-[hsl(var(--muted-foreground))]">{r.u} · {r.f}</div>
                </div>
              </div>
              <button className="text-xs text-navy-800 hover:underline">Ver diff →</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
