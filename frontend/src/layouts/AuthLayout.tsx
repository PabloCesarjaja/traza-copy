import { Outlet, Link } from "react-router-dom";
import { Scale } from "lucide-react";

export default function AuthLayout() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left — brand panel */}
      <div className="hidden lg:flex relative bg-navy-grain text-ivory p-14 flex-col justify-between">
        <Link to="/" className="flex items-center gap-3 relative z-10">
          <div className="w-11 h-11 rounded-md bg-gold-500 text-navy-950 flex items-center justify-center">
            <Scale size={22} strokeWidth={2.2} />
          </div>
          <div className="leading-tight">
            <div className="font-serif text-2xl">TRAZA<span className="text-gold-500">·</span>Legal</div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-white/60">Sistema de gestión de casos</div>
          </div>
        </Link>

        <div className="relative z-10 max-w-md">
          <h2 className="font-serif text-4xl leading-tight">
            Trazabilidad <span className="text-gold-500 italic">legal</span> sin compromisos.
          </h2>
          <p className="mt-5 text-white/70 leading-relaxed">
            Audita cada movimiento, centraliza expedientes y colabora con tu despacho, paralegales y clientes desde un solo lugar.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 text-[11px] uppercase tracking-[0.18em] text-white/50">
            <div><div className="text-3xl text-gold-500 font-serif mb-1">14</div>casos activos</div>
            <div><div className="text-3xl text-gold-500 font-serif mb-1">98%</div>auditoría completa</div>
            <div><div className="text-3xl text-gold-500 font-serif mb-1">24/7</div>portal cliente</div>
          </div>
        </div>

        <div className="text-xs text-white/40 relative z-10">© 2026 TRAZA-Legal · Calidad de Software</div>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center p-8 lg:p-14 bg-ivory">
        <div className="w-full max-w-md animate-fade-up">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
