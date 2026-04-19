import { Link } from "react-router-dom";
import { Briefcase, ArrowUpRight, Calendar, FileText, MessageSquare, Shield } from "lucide-react";
import { casos, findUsuario } from "@/mockData/data";

export default function ClientCases() {
  const misCasos = casos.filter(c => c.cliente==="Jorge Mendoza Ríos" || c.clienteId==="u-006");

  return (
    <div>
      <div className="mb-10">
        <div className="text-[11px] uppercase tracking-[0.22em] text-gold-600 mb-3">RF-07 · Portal del cliente</div>
        <h1 className="font-serif text-5xl leading-tight">Hola, <span className="italic text-navy-800">Jorge</span>.</h1>
        <p className="text-[15px] text-[hsl(var(--muted-foreground))] mt-4 max-w-xl">Aquí puedes ver el avance de tus casos, revisar documentos compartidos por tu equipo legal y comunicarte directamente con ellos.</p>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-10">
        {[
          { n: misCasos.length, l:"Casos activos",   c:"text-navy-800" },
          { n: "02",             l:"Próximas fechas", c:"text-gold-600" },
          { n: "06",             l:"Documentos nuevos", c:"text-emerald-700" },
          { n: "03",             l:"Mensajes sin leer", c:"text-red-700" },
        ].map(s=>(
          <div key={s.l} className="card-paper p-5">
            <div className={`font-serif text-4xl ${s.c}`}>{s.n}</div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))] mt-1">{s.l}</div>
          </div>
        ))}
      </div>

      <h2 className="font-serif text-2xl title-underline mb-6">Mis casos</h2>

      <div className="space-y-4">
        {misCasos.map(c=>{
          const resp = findUsuario(c.responsable);
          const estadoCls = c.estado==="En curso" ? "chip-info" : c.estado==="Cerrado" ? "chip-ok" : "chip-warn";
          return (
            <Link key={c.id} to={`/portal/casos/${c.id}`} className="card-paper p-6 block group hover:border-navy-800 transition-all hover:-translate-y-0.5">
              <div className="flex items-start gap-5 flex-wrap">
                <div className="w-14 h-14 rounded-md bg-navy-800 text-gold-500 flex items-center justify-center shrink-0">
                  <Briefcase size={22}/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="font-mono text-[11px] text-navy-800">{c.id}</span>
                    <span className={`chip ${estadoCls}`}>{c.estado}</span>
                    <span className="chip">{c.materia}</span>
                  </div>
                  <div className="font-serif text-xl leading-snug group-hover:text-navy-800">{c.titulo}</div>
                  <div className="text-sm text-[hsl(var(--muted-foreground))] mt-1">Contraparte: {c.contraparte} · {c.juzgado}</div>

                  <div className="grid grid-cols-3 gap-6 mt-5 pt-4 border-t border-[hsl(var(--line))] text-[13px]">
                    <div><div className="text-[10px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))] mb-1">Tu abogada</div><div className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-navy-800 text-gold-500 text-[10px] font-semibold flex items-center justify-center">{resp?.avatar}</span>{resp?.nombre}</div></div>
                    <div><div className="text-[10px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))] mb-1">Próxima audiencia</div><div className="flex items-center gap-1.5"><Calendar size={12}/> {c.proxAudiencia}</div></div>
                    <div><div className="text-[10px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))] mb-1">Progreso</div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 rounded-full bg-[hsl(var(--muted))] overflow-hidden"><div className="h-full bg-gold-500" style={{width:`${c.progreso}%`}}/></div>
                        <span className="text-[11px]">{c.progreso}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <ArrowUpRight size={18} className="text-[hsl(var(--muted-foreground))] group-hover:text-navy-800 shrink-0"/>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Help */}
      <div className="mt-12 card-paper p-6 flex items-start gap-4 bg-navy-grain text-ivory">
        <Shield size={24} className="text-gold-500 mt-1 shrink-0"/>
        <div>
          <h3 className="font-serif text-lg">Tu información está protegida</h3>
          <p className="text-sm text-white/70 mt-1">Cada acceso a tus documentos se registra. Si notas actividad inusual, contáctanos inmediatamente en <a href="#" className="text-gold-500 underline">soporte@trazalegal.pe</a>.</p>
        </div>
      </div>
    </div>
  );
}
