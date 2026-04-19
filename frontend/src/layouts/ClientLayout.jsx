import { Outlet, Link, useLocation } from "react-router-dom";
import { Scale, Briefcase, Bell, LogOut, User } from "lucide-react";

export default function ClientLayout() {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <header className="border-b border-[hsl(var(--line))] bg-white/70 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center gap-6">
          <Link to="/portal/casos" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-md bg-navy-800 text-gold-500 flex items-center justify-center">
              <Scale size={18} strokeWidth={2.2} />
            </div>
            <div className="leading-tight">
              <div className="font-serif text-lg">TRAZA<span className="text-gold-500">·</span>Legal</div>
              <div className="text-[9px] uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">Portal del cliente</div>
            </div>
          </Link>

          <nav className="ml-4 flex items-center gap-1 text-sm">
            <Link to="/portal/casos" className={`px-3 py-1.5 rounded-md transition-colors ${pathname.startsWith("/portal/casos") ? "bg-navy-800 text-ivory" : "hover:bg-[hsl(var(--muted))]"}`}>
              <Briefcase size={14} className="inline mr-1.5 -mt-0.5"/> Mis casos
            </Link>
          </nav>

          <div className="flex-1"/>
          <button className="p-2 rounded-md hover:bg-[hsl(var(--muted))]"><Bell size={16}/></button>
          <div className="flex items-center gap-2.5 pl-3 border-l border-[hsl(var(--line))]">
            <div className="w-8 h-8 rounded-full bg-navy-800 text-gold-500 text-xs font-semibold flex items-center justify-center">JM</div>
            <div className="leading-tight">
              <div className="text-sm font-medium">Jorge Mendoza R.</div>
              <div className="text-[10px] text-[hsl(var(--muted-foreground))]">Cliente</div>
            </div>
            <button className="ml-1 p-2 rounded-md hover:bg-[hsl(var(--muted))]" title="Salir"><LogOut size={14}/></button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-8 py-10 animate-fade-up">
        <Outlet />
      </main>

      <footer className="border-t border-[hsl(var(--line))] py-5 text-center text-xs text-[hsl(var(--muted-foreground))]">
        © 2026 TRAZA-Legal · Portal cliente · <Link to="/" className="underline hover:text-navy-800">Volver al índice</Link>
      </footer>
    </div>
  );
}
