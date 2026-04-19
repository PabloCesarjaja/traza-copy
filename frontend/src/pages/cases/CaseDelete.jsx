import { Link, useParams } from "react-router-dom";
import { Trash2, AlertTriangle, ArrowLeft, RefreshCw, Archive, ShieldCheck } from "lucide-react";
import { findCaso, findUsuario, tareas, documentos, mensajes } from "@/mockData/data";

export default function CaseDelete() {
  const { id } = useParams();
  const c = findCaso(id) || findCaso("CA-2026-0142");
  const resp = findUsuario(c.responsable);
  const stats = {
    tareas: tareas.filter(t=>t.casoId===c.id).length,
    docs: documentos.filter(d=>d.casoId===c.id).length,
    msjs: mensajes.filter(m=>m.casoId===c.id).length,
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Link to={`/casos/${c.id}`} className="inline-flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-navy-800 mb-5"><ArrowLeft size={14}/> Volver al caso</Link>

      <div className="text-[11px] uppercase tracking-[0.22em] text-red-700 mb-2">RF-01 · Eliminar caso (soft delete)</div>
      <h1 className="font-serif text-4xl text-red-800 mb-6">Archivar este caso</h1>

      {/* Warning banner */}
      <div className="card-paper p-6 border-red-200 bg-red-50/50 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-full bg-red-100 text-red-700 flex items-center justify-center shrink-0"><AlertTriangle size={20}/></div>
          <div>
            <h3 className="font-serif text-lg text-red-900">Esta acción archivará el caso</h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
              El caso <span className="font-mono text-navy-800">{c.id}</span> será marcado como <b>eliminado</b> pero conservado en la base de datos (soft delete). Solo administradores podrán restaurarlo desde el panel de archivados. Toda la información relacionada (tareas, documentos, mensajes, auditoría) se preservará intacta.
            </p>
          </div>
        </div>
      </div>

      {/* Case summary */}
      <div className="card-paper p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-md bg-navy-800 text-gold-500 flex items-center justify-center">
            <Archive size={18}/>
          </div>
          <div>
            <div className="font-serif text-lg">{c.titulo}</div>
            <div className="text-xs text-[hsl(var(--muted-foreground))]">{c.id} · Responsable: {resp?.nombre}</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[hsl(var(--line))]">
          <Stat n={stats.tareas} l="tareas vinculadas"/>
          <Stat n={stats.docs} l="documentos"/>
          <Stat n={stats.msjs} l="mensajes"/>
        </div>
      </div>

      {/* Confirmation form */}
      <div className="card-paper p-6 mb-6">
        <h3 className="font-serif text-lg mb-4">Confirmación</h3>

        <label className="block text-[12px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))] mb-2">Motivo de archivado</label>
        <select className="field mb-4">
          <option>Caso resuelto por acuerdo extrajudicial</option>
          <option>Solicitud expresa del cliente</option>
          <option>Duplicado o creado por error</option>
          <option>Desistimiento de la demanda</option>
          <option>Otro (especificar)</option>
        </select>

        <label className="block text-[12px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))] mb-2">Notas internas</label>
        <textarea className="field min-h-[80px] mb-4" placeholder="Documenta aquí cualquier detalle necesario para futuras consultas..."/>

        <label className="flex items-start gap-3 p-3 rounded-md border border-[hsl(var(--line))] bg-[hsl(var(--muted))] cursor-pointer">
          <input type="checkbox" className="accent-red-700 mt-0.5" data-testid="delete-confirm-checkbox"/>
          <span className="text-sm">Entiendo que este caso será archivado. La acción quedará registrada en la <b>auditoría (RF-06)</b> con mi usuario, IP y fecha.</span>
        </label>
      </div>

      {/* Recovery info */}
      <div className="flex items-start gap-3 p-4 rounded-md bg-[hsl(var(--muted))] border border-[hsl(var(--line))] mb-6 text-sm text-[hsl(var(--muted-foreground))]">
        <ShieldCheck size={18} className="text-navy-800 mt-0.5 shrink-0"/>
        <div>Período de retención: <b>30 días</b>. Durante este lapso un administrador podrá <RefreshCw size={12} className="inline"/> restaurar el caso completo.</div>
      </div>

      <div className="flex gap-3">
        <Link to={`/casos/${c.id}`} data-testid="delete-cancel" className="btn btn-outline flex-1">Cancelar</Link>
        <button data-testid="delete-confirm" className="btn btn-danger flex-1"><Trash2 size={15}/> Archivar caso</button>
      </div>
    </div>
  );
}

const Stat = ({ n, l }) => (
  <div>
    <div className="font-serif text-2xl text-navy-800">{n}</div>
    <div className="text-[11px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))] mt-0.5">{l}</div>
  </div>
);
