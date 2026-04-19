import { Outlet, Link, useLocation, useParams } from "react-router-dom";
import { Scale, LayoutDashboard, Briefcase, ListChecks, FileText, MessageSquare, Shield, User, LogOut, Bell, Search, ChevronRight, Plus } from "lucide-react";
import { currentUser } from "@/mockData/data";

const sidebarGroups = [
  { label: "Principal", items: [
    { to: "/", icon: LayoutDashboard, label: "Índice de mockups" },
    { to: "/casos", icon: Briefcase, label: "Casos" },
  ]},
  { label: "Caso activo · CA-2026-0142", items: [
    { to: "/casos/CA-2026-0142", icon: ChevronRight, label: "Detalle" },
    { to: "/casos/CA-2026-0142/tareas", icon: ListChecks, label: "Tareas" },
    { to: "/casos/CA-2026-0142/documentos", icon: FileText, label: "Documentos" },
    { to: "/casos/CA-2026-0142/mensajes", icon: MessageSquare, label: "Mensajes" },
    { to: "/casos/CA-2026-0142/auditoria", icon: Shield, label: "Auditoría" },
  ]},
  { label: "Cuenta", items: [
    { to: "/perfil", icon: User, label: "Mi perfil" },
    { to: "/logout", icon: LogOut, label: "Cerrar sesión" },
  ]},
];

export default function AppLayout() {
  const { pathname } = useLocation();
  const params = useParams();
  const isActive = (to) => pathname === to || (to !== "/" && pathname.startsWith(to));

  return (
    <div className="min-h-screen flex bg-paper">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-navy-grain text-ivory sticky top-0 h-screen flex flex-col">
        <Link to="/" className="px-5 pt-6 pb-5 flex items-center gap-3 border-b border-white/10">
          <div className="w-10 h-10 rounded-md bg-gold-500 text-navy-950 flex items-center justify-center">
            <Scale size={20} strokeWidth={2.2} />
          </div>
          <div className="leading-tight">
            <div className="font-serif text-[19px] tracking-tight">TRAZA<span className="text-gold-500">·</span>Legal</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/60">Gestión de casos</div>
          </div>
        </Link>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5 text-sm">
          {sidebarGroups.map((g) => (
            <div key={g.label}>
              <div className="px-3 mb-2 text-[10px] uppercase tracking-[0.18em] text-white/40">{g.label}</div>
              <ul className="space-y-1">
                {g.items.map(it => {
                  const Icon = it.icon;
                  const active = isActive(it.to);
                  return (
                    <li key={it.to}>
                      <Link to={it.to} data-testid={`sidebar-link-${it.label.toLowerCase().replace(/\s+/g,'-')}`}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${active ? "bg-white/10 text-gold-500" : "text-white/80 hover:bg-white/5"}`}>
                        <Icon size={16} />
                        <span>{it.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="px-5 py-4 border-t border-white/10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gold-500 text-navy-950 font-semibold flex items-center justify-center">{currentUser.avatar}</div>
          <div className="min-w-0">
            <div className="text-sm truncate">{currentUser.nombre}</div>
            <div className="text-[11px] text-white/50">{currentUser.rol}</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-10 bg-ivory/80 backdrop-blur border-b border-[hsl(var(--line))]">
          <div className="px-8 py-3.5 flex items-center gap-4">
            <div className="flex-1 flex items-center gap-2 max-w-md">
              <Search size={16} className="text-[hsl(var(--muted-foreground))]" />
              <input
                data-testid="topbar-search"
                className="bg-transparent outline-none text-sm w-full placeholder:text-[hsl(var(--muted-foreground))]"
                placeholder="Buscar expediente, cliente, juzgado..."
              />
            </div>
            <Link to="/casos/nuevo" data-testid="topbar-new-case" className="btn btn-gold text-xs"><Plus size={14}/> Nuevo caso</Link>
            <button data-testid="topbar-notifications" className="relative p-2 rounded-md hover:bg-[hsl(var(--muted))]">
              <Bell size={16} />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-gold-500"/>
            </button>
          </div>
        </header>

        <main className="flex-1 px-8 py-8 animate-fade-up">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
