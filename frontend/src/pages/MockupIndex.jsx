import { Link } from "react-router-dom";
import { Scale, ArrowUpRight, Sparkles } from "lucide-react";
import { mockupsCatalog } from "@/mockData/data";

export default function MockupIndex() {
  return (
    <div className="min-h-screen bg-paper">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[hsl(var(--line))]">
        <div className="absolute inset-0 bg-navy-grain opacity-[0.04]"/>
        <div className="max-w-6xl mx-auto px-8 pt-20 pb-16 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-md bg-navy-800 text-gold-500 flex items-center justify-center">
              <Scale size={22} strokeWidth={2.2} />
            </div>
            <div className="leading-tight">
              <div className="font-serif text-xl">TRAZA<span className="text-gold-500">·</span>Legal</div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">Mockups de alta fidelidad · v1.0</div>
            </div>
          </div>

          <h1 className="font-serif text-5xl md:text-6xl leading-[1.05] max-w-3xl tracking-tight">
            19 pantallas para el sistema de
            <span className="italic text-navy-800"> trazabilidad legal</span>
            <span className="text-gold-500">.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[hsl(var(--muted-foreground))]">
            Prototipo navegable cubriendo los requerimientos funcionales RF-01 a RF-07:
            gestión de casos, tareas, documentos, mensajería en tiempo real, portal para clientes y auditoría completa. Cada pantalla es clickeable para revisión del equipo de calidad.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/login" data-testid="hero-start-btn" className="btn btn-primary">
              Comenzar recorrido <ArrowUpRight size={15}/>
            </Link>
            <Link to="/casos" data-testid="hero-dashboard-btn" className="btn btn-outline">Ver tablero de casos</Link>
            <Link to="/portal/casos" data-testid="hero-portal-btn" className="btn btn-ghost">Portal del cliente →</Link>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[hsl(var(--line))]">
            {[
              { n: "19", l: "mockups" },
              { n: "07", l: "requerimientos" },
              { n: "04", l: "roles" },
              { n: "100%", l: "en español" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-serif text-4xl text-navy-800">{s.n}</div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))] mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section className="max-w-6xl mx-auto px-8 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-gold-600 font-medium mb-2 flex items-center gap-2">
              <Sparkles size={12}/> Catálogo
            </div>
            <h2 className="font-serif text-3xl title-underline">Pantallas por requerimiento</h2>
          </div>
          <div className="text-xs text-[hsl(var(--muted-foreground))] hidden md:block">Click en cualquier tarjeta para abrir el mockup</div>
        </div>

        <div className="space-y-12">
          {mockupsCatalog.map((grupo) => (
            <div key={grupo.grupo}>
              <div className="flex items-baseline gap-3 mb-4">
                <h3 className="font-serif text-xl">{grupo.grupo.split("·")[1]}</h3>
                <span className="chip chip-gold">{grupo.grupo.split("·")[0].trim()}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {grupo.items.map((m) => (
                  <Link
                    key={m.n}
                    to={m.path}
                    data-testid={`mockup-card-${m.n}`}
                    className="card-paper p-5 group hover:border-navy-800 transition-all hover:-translate-y-0.5"
                  >
                    <div className="flex items-start justify-between">
                      <div className="font-mono text-[11px] text-gold-600">#{m.n}</div>
                      <ArrowUpRight size={14} className="text-[hsl(var(--muted-foreground))] group-hover:text-navy-800 transition-colors"/>
                    </div>
                    <div className="mt-2 font-serif text-[17px] leading-snug">{m.nombre}</div>
                    <div className="mt-3 text-[11px] text-[hsl(var(--muted-foreground))] font-mono">{m.path}</div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-[hsl(var(--line))] py-8 text-center text-xs text-[hsl(var(--muted-foreground))]">
        TRAZA-Legal · Mockups QA-SW · Todos los datos son ficticios
      </footer>
    </div>
  );
}
