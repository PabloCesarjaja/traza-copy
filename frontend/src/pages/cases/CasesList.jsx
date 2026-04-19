import { Link } from "react-router-dom";
import { Filter, Download, Plus, MoreHorizontal, ArrowUpDown, Search } from "lucide-react";
import { useState } from "react";
import { casos as allCasos, ROLES, findUsuario } from "@/mockData/data";

const roleViews = {
  [ROLES.ABOGADO]:   { label: "Abogado", hint: "Casos asignados a ti o a tu equipo" },
  [ROLES.PARALEGAL]: { label: "Paralegal", hint: "Casos donde colaboras" },
  [ROLES.ADMIN]:     { label: "Admin",    hint: "Todos los casos del despacho" },
};

export default function CasesList() {
  const [rol, setRol] = useState(ROLES.ABOGADO);
  const visibles = allCasos.filter(c => !c.eliminado);

  const kpis = [
    { label: "Casos activos",       val: visibles.filter(c=>c.estado==="En curso" || c.estado==="Audiencia programada").length, accent: "text-navy-800" },
    { label: "Audiencias próximas", val: 3, accent: "text-gold-600" },
    { label: "Tareas vencidas",     val: 2, accent: "text-red-700" },
    { label: "Cerrados (mes)",      val: 5, accent: "text-emerald-700" },
  ];

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-gold-600 mb-2">RF-01 · Listar casos según rol</div>
          <h1 className="font-serif text-4xl title-underline">Tablero de casos</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-3">{roleViews[rol]?.hint}</p>
        </div>
        <div className="flex gap-2">
          <button data-testid="cases-export" className="btn btn-outline"><Download size={14}/> Exportar</button>
          <Link to="/casos/nuevo" data-testid="cases-new" className="btn btn-gold"><Plus size={15}/> Nuevo caso</Link>
        </div>
      </div>

      {/* Role switcher */}
      <div className="flex flex-wrap items-center gap-2 mb-6 card-paper p-2">
        <span className="text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))] pl-2 pr-1">Ver como</span>
        {Object.values(ROLES).map(r => (
          <button key={r} data-testid={`role-${r}`} onClick={()=>setRol(r)}
            className={`px-4 py-1.5 rounded-md text-sm transition-colors ${rol===r ? "bg-navy-800 text-ivory" : "text-navy-800 hover:bg-[hsl(var(--muted))]"}`}>
            {r}
          </button>
        ))}
        <span className="ml-auto text-xs text-[hsl(var(--muted-foreground))] pr-2">Mostrando {visibles.length} casos</span>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map(k=>(
          <div key={k.label} className="card-paper p-5">
            <div className={`font-serif text-4xl ${k.accent}`}>{k.val}</div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))] mt-1">{k.label}</div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex-1 relative min-w-[260px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]"/>
          <input placeholder="Buscar por expediente, cliente o juzgado..." className="field pl-10"/>
        </div>
        <select className="field w-auto"><option>Todas las materias</option><option>Civil</option><option>Laboral</option><option>Administrativo</option></select>
        <select className="field w-auto"><option>Todos los estados</option><option>En curso</option><option>Cerrado</option></select>
        <button className="btn btn-outline"><Filter size={14}/> Más filtros</button>
      </div>

      {/* Table */}
      <div className="card-paper overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[hsl(var(--muted))] text-left text-[11px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))]">
            <tr>
              <th className="px-5 py-3 font-medium">Expediente <ArrowUpDown size={11} className="inline ml-1"/></th>
              <th className="px-5 py-3 font-medium">Caso</th>
              <th className="px-5 py-3 font-medium">Materia</th>
              <th className="px-5 py-3 font-medium">Estado</th>
              <th className="px-5 py-3 font-medium">Responsable</th>
              <th className="px-5 py-3 font-medium">Próx. audiencia</th>
              <th className="px-5 py-3 font-medium text-right">Progreso</th>
              <th className="px-5 py-3"/>
            </tr>
          </thead>
          <tbody>
            {visibles.map((c)=>{
              const resp = findUsuario(c.responsable);
              const estadoCls = c.estado==="En curso" ? "chip-info" : c.estado==="Cerrado" ? "chip-ok" : c.estado==="Audiencia programada" ? "chip-warn" : "";
              return (
                <tr key={c.id} className="border-t border-[hsl(var(--line))] hover:bg-[hsl(var(--muted))/0.4] transition-colors">
                  <td className="px-5 py-3.5 font-mono text-[12px] text-navy-800">{c.id}</td>
                  <td className="px-5 py-3.5 max-w-xs">
                    <Link to={`/casos/${c.id}`} className="font-medium hover:text-navy-800 hover:underline">{c.titulo}</Link>
                    <div className="text-[11px] text-[hsl(var(--muted-foreground))] truncate">{c.cliente} · {c.juzgado}</div>
                  </td>
                  <td className="px-5 py-3.5"><span className="chip">{c.materia}</span></td>
                  <td className="px-5 py-3.5"><span className={`chip ${estadoCls}`}>{c.estado}</span></td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-navy-800 text-gold-500 text-[11px] font-semibold flex items-center justify-center">{resp?.avatar}</div>
                      <span className="text-[13px]">{resp?.nombre.split(" ").slice(0,2).join(" ")}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-[13px]">{c.proxAudiencia}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2 justify-end">
                      <div className="w-20 h-1.5 rounded-full bg-[hsl(var(--muted))] overflow-hidden">
                        <div className="h-full bg-gold-500" style={{width:`${c.progreso}%`}}/>
                      </div>
                      <span className="text-[11px] text-[hsl(var(--muted-foreground))] w-8 text-right">{c.progreso}%</span>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-right"><button className="p-1.5 rounded hover:bg-[hsl(var(--muted))]"><MoreHorizontal size={15}/></button></td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex items-center justify-between px-5 py-3 text-xs text-[hsl(var(--muted-foreground))] border-t border-[hsl(var(--line))]">
          <span>Mostrando 1–{visibles.length} de {visibles.length}</span>
          <div className="flex gap-1">
            <button className="px-2 py-1 border border-[hsl(var(--line))] rounded">←</button>
            <button className="px-2 py-1 bg-navy-800 text-ivory rounded">1</button>
            <button className="px-2 py-1 border border-[hsl(var(--line))] rounded">→</button>
          </div>
        </div>
      </div>
    </div>
  );
}
