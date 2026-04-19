import { Link, useParams } from "react-router-dom";
import { Send, Paperclip, Smile, Search, PenLine, Circle } from "lucide-react";
import { findCaso, findUsuario, mensajes as allMsgs } from "@/mockData/data";

export default function MessagesList() {
  const { id } = useParams();
  const c = findCaso(id) || findCaso("CA-2026-0142");
  const msgs = allMsgs.filter(m=>m.casoId===c.id);

  const conversaciones = [
    { id:"conv-1", nombre:"Jorge Mendoza R. · Cliente", last:"Dra., confirmado el punto 4...", hora:"11:30", unread:2, online:true,  active:true },
    { id:"conv-2", nombre:"Luis Herrera (paralegal)",    last:"Coordiné la notificación por...",  hora:"09:02", unread:0, online:true,  active:false },
    { id:"conv-3", nombre:"Dr. Benavides",              last:"Revisemos la estrategia...",       hora:"Ayer", unread:0, online:false, active:false },
    { id:"conv-4", nombre:"Inmobiliaria Altuna (CP)",   last:"Acuse de recibo de la...",         hora:"Lun",  unread:0, online:false, active:false },
  ];

  return (
    <div>
      <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-gold-600 mb-2">RF-04 · Mensajes del caso</div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="font-serif text-3xl">Mensajería</h1>
            <span className="font-mono text-xs text-navy-800">{c.id}</span>
          </div>
        </div>
        <Link to={`/casos/${c.id}/mensajes/nuevo`} className="btn btn-gold"><PenLine size={15}/> Nuevo mensaje</Link>
      </div>

      <div className="card-paper overflow-hidden grid grid-cols-[280px_1fr] h-[calc(100vh-220px)] min-h-[520px]">
        {/* Sidebar */}
        <aside className="border-r border-[hsl(var(--line))] flex flex-col">
          <div className="p-3 border-b border-[hsl(var(--line))]">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]"/>
              <input placeholder="Buscar conversación..." className="field pl-8 text-xs py-2"/>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversaciones.map(cv=>(
              <button key={cv.id} className={`w-full text-left p-3 border-b border-[hsl(var(--line))] hover:bg-[hsl(var(--muted))] ${cv.active ? "bg-[hsl(var(--muted))]" : ""}`}>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-navy-800 text-gold-500 text-sm font-semibold flex items-center justify-center">{cv.nombre.split(" ").map(w=>w[0]).slice(0,2).join("")}</div>
                    {cv.online && <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"/>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium truncate">{cv.nombre}</div>
                      <div className="text-[10px] text-[hsl(var(--muted-foreground))]">{cv.hora}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-[hsl(var(--muted-foreground))] truncate">{cv.last}</div>
                      {cv.unread>0 && <span className="text-[10px] bg-gold-500 text-navy-950 rounded-full w-4 h-4 flex items-center justify-center">{cv.unread}</span>}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Thread */}
        <section className="flex flex-col">
          <div className="p-4 border-b border-[hsl(var(--line))] flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-navy-800 text-gold-500 text-sm font-semibold flex items-center justify-center">JM</div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"/>
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm">Jorge Mendoza R.</div>
              <div className="text-[11px] text-emerald-700 flex items-center gap-1"><Circle size={7} fill="currentColor"/> En línea</div>
            </div>
            <span className="chip chip-gold">Cliente</span>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-[hsl(var(--ivory))] to-white">
            <div className="text-center text-[11px] text-[hsl(var(--muted-foreground))]">— 22 de enero de 2026 —</div>
            {msgs.map((m)=>{
              const u = findUsuario(m.autor);
              const mine = m.autor==="u-001";
              return (
                <div key={m.id} className={`flex gap-2 ${mine?"justify-end":""}`}>
                  {!mine && <div className="w-8 h-8 rounded-full bg-navy-800 text-gold-500 text-[10px] font-semibold flex items-center justify-center shrink-0">{u?.avatar}</div>}
                  <div className={`max-w-[70%] ${mine?"items-end":"items-start"} flex flex-col`}>
                    <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${mine?"bg-navy-800 text-ivory rounded-br-sm":"bg-white border border-[hsl(var(--line))] rounded-bl-sm"}`}>
                      {!mine && <div className="text-[11px] text-gold-600 font-medium mb-0.5">{u?.nombre}</div>}
                      {m.cuerpo}
                      {m.adjuntos?.length>0 && (
                        <div className={`mt-2 pt-2 border-t ${mine?"border-white/20":"border-[hsl(var(--line))]"}`}>
                          {m.adjuntos.map(a=>(
                            <div key={a} className={`flex items-center gap-2 text-xs ${mine?"text-gold-400":"text-navy-800"}`}>
                              <Paperclip size={12}/> {a}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-[10px] text-[hsl(var(--muted-foreground))] mt-1 px-1">{m.fecha.split(" ")[1]} {mine && "· Leído ✓✓"}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Composer */}
          <div className="p-3 border-t border-[hsl(var(--line))] bg-white">
            <div className="flex items-end gap-2">
              <button className="p-2.5 rounded-md hover:bg-[hsl(var(--muted))]" title="Adjuntar"><Paperclip size={16}/></button>
              <button className="p-2.5 rounded-md hover:bg-[hsl(var(--muted))]" title="Emoji"><Smile size={16}/></button>
              <input placeholder="Escribe un mensaje..." className="field flex-1"/>
              <button data-testid="msg-send" className="btn btn-gold"><Send size={14}/> Enviar</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
