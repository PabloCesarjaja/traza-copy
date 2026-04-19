import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, User, FileText, MessageSquare, Download, Send, Clock, CheckCircle2 } from "lucide-react";
import { findCaso, findUsuario, documentos, mensajes } from "@/mockData/data";

export default function ClientCaseDetail() {
  const { id } = useParams();
  const c = findCaso(id) || findCaso("CA-2026-0142");
  const resp = findUsuario(c.responsable);
  const docs = documentos.filter(d=>d.casoId===c.id).slice(0,4);
  const msgs = mensajes.filter(m=>m.casoId===c.id).slice(-3);

  const hitos = [
    { t:"Demanda presentada",        f:"12 ene 2026", ok:true },
    { t:"Auto admisorio",             f:"18 ene 2026", ok:true },
    { t:"Contestación de la demanda", f:"30 ene 2026", ok:false, current:true },
    { t:"Audiencia única",            f:"04 feb 2026", ok:false },
    { t:"Sentencia",                  f:"—",            ok:false },
  ];

  return (
    <div>
      <Link to="/portal/casos" className="inline-flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-navy-800 mb-5"><ArrowLeft size={14}/> Mis casos</Link>

      {/* Hero */}
      <div className="card-paper overflow-hidden mb-6">
        <div className="bg-navy-grain text-ivory p-8">
          <div className="flex items-start gap-2 mb-3 flex-wrap">
            <span className="font-mono text-[11px] text-gold-400">{c.id}</span>
            <span className="chip chip-gold">{c.estado}</span>
          </div>
          <h1 className="font-serif text-3xl leading-tight max-w-2xl">{c.titulo}</h1>
          <p className="text-white/70 mt-3 max-w-2xl text-sm">{c.resumen}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 p-6">
          <M icon={User} label="Tu abogada" value={resp?.nombre}/>
          <M icon={MapPin} label="Juzgado" value={c.juzgado}/>
          <M icon={Calendar} label="Próx. audiencia" value={c.proxAudiencia} accent/>
          <M icon={FileText} label="Expediente" value={c.expediente} mono/>
        </div>
      </div>

      {/* Progreso procesal */}
      <div className="card-paper p-7 mb-6">
        <h3 className="font-serif text-xl mb-5">Avance del proceso</h3>
        <ol className="relative flex gap-2 items-start overflow-x-auto pb-2">
          {hitos.map((h,i)=>(
            <li key={h.t} className="flex-1 min-w-[140px]">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${h.ok?"bg-emerald-500 text-white":h.current?"bg-gold-500 text-navy-950 ring-4 ring-gold-500/20":"bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]"}`}>
                  {h.ok ? <CheckCircle2 size={16}/> : i+1}
                </div>
                {i<hitos.length-1 && <div className={`flex-1 h-0.5 ${h.ok?"bg-emerald-500":"bg-[hsl(var(--line))]"}`}/>}
              </div>
              <div className="mt-3">
                <div className={`text-sm font-medium ${h.current?"text-gold-600":""}`}>{h.t}</div>
                <div className="text-[11px] text-[hsl(var(--muted-foreground))] mt-0.5 flex items-center gap-1"><Clock size={10}/> {h.f}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Documentos compartidos */}
        <div className="lg:col-span-2 card-paper p-7">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-serif text-xl">Documentos compartidos contigo</h3>
            <span className="text-xs text-[hsl(var(--muted-foreground))]">{docs.length} archivos</span>
          </div>
          <div className="space-y-2">
            {docs.map(d=>(
              <div key={d.id} className="flex items-center gap-3 p-3 rounded-md border border-[hsl(var(--line))] hover:bg-[hsl(var(--muted))]">
                <div className="w-10 h-10 rounded-md bg-red-50 text-red-700 flex items-center justify-center shrink-0"><FileText size={17}/></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{d.nombre}</div>
                  <div className="text-[11px] text-[hsl(var(--muted-foreground))]">{d.etiqueta} · {d.peso} · {d.fecha}</div>
                </div>
                <button className="btn btn-outline text-xs"><Download size={12}/> Descargar</button>
              </div>
            ))}
          </div>
        </div>

        {/* Mensajes con tu abogada */}
        <div className="card-paper p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-4"><MessageSquare size={16} className="text-gold-600"/><h3 className="font-serif text-lg">Conversación</h3></div>
          <div className="flex-1 space-y-3 mb-4 min-h-[200px]">
            {msgs.map(m=>{
              const u = findUsuario(m.autor);
              const mine = m.autor==="u-006";
              return (
                <div key={m.id} className={`flex gap-2 ${mine?"justify-end":""}`}>
                  <div className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${mine?"bg-navy-800 text-ivory":"bg-[hsl(var(--muted))] border border-[hsl(var(--line))]"}`}>
                    {!mine && <div className="text-[10px] font-medium text-gold-600 mb-0.5">{u?.nombre.split(" ")[0]}</div>}
                    <div className="leading-snug">{m.cuerpo.slice(0,110)}{m.cuerpo.length>110?"...":""}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-2 pt-3 border-t border-[hsl(var(--line))]">
            <input placeholder="Escribe a tu abogada..." className="field text-xs py-2"/>
            <button className="btn btn-gold px-3 py-2"><Send size={14}/></button>
          </div>
        </div>
      </div>
    </div>
  );
}

const M = ({ icon:Icon, label, value, accent, mono }) => (
  <div className="flex items-start gap-2.5">
    <Icon size={15} className={`mt-0.5 ${accent?"text-gold-600":"text-[hsl(var(--muted-foreground))]"}`}/>
    <div>
      <div className="text-[10px] uppercase tracking-[0.16em] text-[hsl(var(--muted-foreground))]">{label}</div>
      <div className={`text-sm mt-0.5 ${accent?"font-medium text-navy-800":""} ${mono?"font-mono text-[12px]":""}`}>{value}</div>
    </div>
  </div>
);
