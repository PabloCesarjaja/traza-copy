import { Link } from "react-router-dom";
import { ArrowLeft, Check, Users, Building2, Gavel } from "lucide-react";
import { usuarios, ROLES } from "@/mockData/data";

export default function CaseCreate() {
  const abogados = usuarios.filter(u => u.rol===ROLES.ABOGADO || u.rol===ROLES.PARALEGAL);
  const clientes = usuarios.filter(u => u.rol===ROLES.CLIENTE);

  return (
    <div className="max-w-5xl">
      <Link to="/casos" className="inline-flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-navy-800 mb-5"><ArrowLeft size={14}/> Volver a casos</Link>

      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-gold-600 mb-2">RF-01 · Crear caso</div>
          <h1 className="font-serif text-4xl title-underline">Apertura de expediente</h1>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline">Guardar borrador</button>
          <button data-testid="case-create-submit" className="btn btn-gold"><Check size={15}/> Crear caso</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Datos generales */}
          <div className="card-paper p-7">
            <div className="flex items-center gap-2 mb-5"><Gavel size={16} className="text-gold-600"/><h3 className="font-serif text-xl">Datos generales</h3></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <L label="Título del caso"/><input data-testid="case-title" className="field" placeholder="Ej. Mendoza c/ Inmobiliaria Altuna"/>
              </div>
              <div>
                <L label="Materia"/>
                <select className="field"><option>Civil</option><option>Laboral</option><option>Penal</option><option>Administrativo</option><option>Sucesiones</option><option>Tributario</option></select>
              </div>
              <div>
                <L label="Sub-materia"/>
                <select className="field"><option>Incumplimiento contractual</option><option>Despido arbitrario</option><option>Amparo</option></select>
              </div>
              <div>
                <L label="Juzgado / sede"/>
                <input className="field" placeholder="3° Juzgado Civil de Lima"/>
              </div>
              <div>
                <L label="N° de expediente"/>
                <input className="field" placeholder="00000-2026-0-1801-JR-CI-03"/>
              </div>
              <div>
                <L label="Fecha de apertura"/>
                <input type="date" className="field" defaultValue="2026-01-23"/>
              </div>
              <div>
                <L label="Cuantía estimada (S/)"/>
                <input className="field" placeholder="0.00"/>
              </div>
              <div className="col-span-2">
                <L label="Resumen"/>
                <textarea className="field min-h-[110px]" placeholder="Describe brevemente la pretensión, hechos relevantes y estrategia inicial..."/>
              </div>
            </div>
          </div>

          {/* Partes */}
          <div className="card-paper p-7">
            <div className="flex items-center gap-2 mb-5"><Building2 size={16} className="text-gold-600"/><h3 className="font-serif text-xl">Partes intervinientes</h3></div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <L label="Cliente / demandante"/>
                <select className="field">{clientes.map(c=><option key={c.id}>{c.nombre}</option>)}<option>+ Agregar nuevo cliente</option></select>
              </div>
              <div>
                <L label="Contraparte"/>
                <input className="field" placeholder="Nombre o razón social"/>
              </div>
              <div>
                <L label="Abogado de la contraparte"/>
                <input className="field" placeholder="Opcional"/>
              </div>
              <div>
                <L label="Juez/a (si asignado)"/>
                <input className="field" placeholder="Opcional"/>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="card-paper p-6">
            <div className="flex items-center gap-2 mb-4"><Users size={16} className="text-gold-600"/><h3 className="font-serif text-lg">Equipo asignado</h3></div>
            <L label="Responsable principal"/>
            <select className="field mb-4">{abogados.filter(a=>a.rol===ROLES.ABOGADO).map(a=><option key={a.id}>{a.nombre}</option>)}</select>
            <L label="Colaboradores"/>
            <div className="space-y-2">
              {abogados.map(u=>(
                <label key={u.id} className="flex items-center gap-3 text-sm p-2 rounded hover:bg-[hsl(var(--muted))]">
                  <input type="checkbox" defaultChecked={u.id==="u-002"} className="accent-[hsl(var(--navy-800))]"/>
                  <div className="w-7 h-7 rounded-full bg-navy-800 text-gold-500 text-[11px] font-semibold flex items-center justify-center">{u.avatar}</div>
                  <div className="flex-1">
                    <div>{u.nombre}</div>
                    <div className="text-[10px] text-[hsl(var(--muted-foreground))]">{u.rol}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="card-paper p-6">
            <h3 className="font-serif text-lg mb-4">Prioridad y etiquetas</h3>
            <L label="Prioridad"/>
            <div className="flex gap-2 mb-4">
              {["Baja","Media","Alta"].map((p,i)=>(
                <label key={p} className={`flex-1 border rounded-md p-2 text-center text-sm cursor-pointer ${i===1 ? "border-navy-800 bg-navy-800 text-ivory" : "border-[hsl(var(--line))]"}`}>
                  <input type="radio" name="prio" defaultChecked={i===1} className="sr-only"/>{p}
                </label>
              ))}
            </div>
            <L label="Etiquetas"/>
            <div className="flex flex-wrap gap-2">
              {["Urgente","Contractual","Apelación"].map(t=><span key={t} className="chip chip-gold">{t} ×</span>)}
              <button className="chip">+ Añadir</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const L = ({ label }) => <label className="block text-[12px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))] mb-2">{label}</label>;
