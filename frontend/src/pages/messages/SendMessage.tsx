import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Send, Paperclip, Users, Eye, Lock, FileText } from "lucide-react";
import { findCaso, findUsuario } from "@/mockData/data";

export default function SendMessage() {
  const { id } = useParams();
  const c = findCaso(id) || findCaso("CA-2026-0142");

  const L = ({ label }) => <label className="block text-[12px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))] mb-2">{label}</label>;
  const destinatarios = ["u-006","u-002"].map(findUsuario);

  return (
    <div className="max-w-4xl">
      <Link to={`/casos/${c.id}/mensajes`} className="inline-flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-navy-800 mb-5"><ArrowLeft size={14}/> Volver a mensajes</Link>

      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-gold-600 mb-2">RF-04 · Enviar mensaje</div>
          <h1 className="font-serif text-4xl title-underline mb-2">Componer mensaje</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Caso <span className="font-mono text-navy-800">{c.id}</span> · {c.titulo.slice(0,50)}...</p>
        </div>
      </div>

      <div className="card-paper p-7 space-y-5">
        <div>
          <div className="flex items-center gap-2 mb-2"><Users size={13} className="text-gold-600"/><L label="Para"/></div>
          <div className="field flex flex-wrap items-center gap-2 min-h-[44px] py-2">
            {destinatarios.map(u=>(
              <span key={u.id} className="inline-flex items-center gap-1.5 bg-navy-800 text-ivory rounded-full pl-1 pr-2 py-0.5 text-xs">
                <span className="w-5 h-5 rounded-full bg-gold-500 text-navy-950 text-[9px] font-semibold flex items-center justify-center">{u.avatar}</span>
                {u.nombre.split(" ").slice(0,2).join(" ")} ×
              </span>
            ))}
            <input className="flex-1 outline-none text-sm bg-transparent min-w-[120px]" placeholder="Añadir destinatario..."/>
          </div>
          <div className="text-[11px] text-[hsl(var(--muted-foreground))] mt-1.5">Sugerencias: equipo del caso, cliente, contraparte</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <L label="Visibilidad"/>
            <select className="field">
              <option>Privado (solo destinatarios)</option>
              <option>Equipo del caso</option>
              <option>Incluir al cliente (portal)</option>
            </select>
          </div>
          <div>
            <L label="Prioridad"/>
            <select className="field"><option>Normal</option><option>Urgente</option><option>Informativo</option></select>
          </div>
        </div>

        <div>
          <L label="Asunto"/>
          <input data-testid="msg-subject" className="field" placeholder="Ej. Revisión del escrito de subsanación v3" defaultValue="Envío escrito de subsanación para revisión"/>
        </div>

        <div>
          <L label="Mensaje"/>
          <div className="border border-[hsl(var(--line))] rounded-md overflow-hidden">
            <div className="flex items-center gap-1 p-2 border-b border-[hsl(var(--line))] bg-[hsl(var(--muted))] text-xs">
              <button className="px-2 py-1 hover:bg-white rounded font-bold">B</button>
              <button className="px-2 py-1 hover:bg-white rounded italic">I</button>
              <button className="px-2 py-1 hover:bg-white rounded underline">U</button>
              <span className="w-px h-4 bg-[hsl(var(--line))] mx-1"/>
              <button className="px-2 py-1 hover:bg-white rounded">• Lista</button>
              <button className="px-2 py-1 hover:bg-white rounded">Cita</button>
              <button className="px-2 py-1 hover:bg-white rounded">{"<>"}</button>
            </div>
            <textarea data-testid="msg-body" className="w-full p-4 text-sm outline-none min-h-[200px] resize-none" defaultValue={"Estimado don Jorge,\n\nLe comparto el escrito de subsanación en su versión 3, incorporando las observaciones que discutimos el día martes. Por favor revise especialmente el punto 4 referente a la indemnización, y avíseme cualquier comentario antes del jueves para presentarlo a tiempo.\n\nQuedo atenta a sus comentarios.\n\nCordialmente,\nMaría Fernanda Ortiz"}/>
          </div>
        </div>

        <div>
          <L label="Archivos adjuntos"/>
          <div className="flex items-center gap-2 p-3 bg-[hsl(var(--muted))] rounded-md border border-[hsl(var(--line))]">
            <div className="w-10 h-10 rounded-md bg-red-50 text-red-700 flex items-center justify-center"><FileText size={18}/></div>
            <div className="flex-1">
              <div className="text-sm font-medium">Escrito_subsanacion_v3.pdf</div>
              <div className="text-[11px] text-[hsl(var(--muted-foreground))]">1.4 MB · Adjuntado desde el expediente</div>
            </div>
            <button className="text-xs text-red-700 hover:underline">Quitar</button>
          </div>
          <button className="btn btn-outline mt-2 text-xs"><Paperclip size={13}/> Añadir otro archivo</button>
        </div>

        <div className="flex items-center gap-6 text-sm pt-4 border-t border-[hsl(var(--line))]">
          <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-[hsl(var(--navy-800))]"/> Solicitar confirmación de lectura</label>
          <label className="flex items-center gap-2"><input type="checkbox" className="accent-[hsl(var(--navy-800))]"/> <Lock size={12}/> Marcar confidencial</label>
          <label className="flex items-center gap-2 ml-auto"><Eye size={13}/> <span className="text-[hsl(var(--muted-foreground))]">Visible para: 2 personas</span></label>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <Link to={`/casos/${c.id}/mensajes`} className="btn btn-outline">Cancelar</Link>
        <button className="btn btn-ghost">Guardar borrador</button>
        <div className="flex-1"/>
        <button data-testid="msg-send-final" className="btn btn-gold"><Send size={15}/> Enviar mensaje</button>
      </div>
    </div>
  );
}
