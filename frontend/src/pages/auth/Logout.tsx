import { Link } from "react-router-dom";
import { LogOut, ShieldCheck } from "lucide-react";
import { currentUser } from "@/mockData/data";

export default function Logout() {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.22em] text-gold-600 mb-3">RF-05 · Cerrar sesión</div>
      <h1 className="font-serif text-4xl title-underline mb-8">¿Deseas cerrar la sesión?</h1>

      <div className="card-paper p-6 flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-navy-800 text-gold-500 font-semibold flex items-center justify-center">{currentUser.avatar}</div>
        <div>
          <div className="font-medium">{currentUser.nombre}</div>
          <div className="text-xs text-[hsl(var(--muted-foreground))]">{currentUser.correo} · {currentUser.rol}</div>
        </div>
      </div>

      <div className="flex items-start gap-3 p-4 rounded-md bg-[hsl(var(--muted))] border border-[hsl(var(--line))] mb-6">
        <ShieldCheck size={18} className="text-navy-800 mt-0.5 shrink-0"/>
        <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
          Por seguridad, se cerrará la sesión en todos los dispositivos y se invalidarán tus tokens activos.
          Cualquier cambio no guardado en formularios abiertos se perderá.
        </p>
      </div>

      <label className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] mb-6">
        <input type="checkbox" className="accent-[hsl(var(--navy-800))]"/> Cerrar sesión solo en este dispositivo
      </label>

      <div className="flex gap-3">
        <Link to="/casos" data-testid="logout-cancel" className="btn btn-outline flex-1">Cancelar</Link>
        <Link to="/login" data-testid="logout-confirm" className="btn btn-danger flex-1"><LogOut size={15}/> Cerrar sesión</Link>
      </div>

      <div className="text-center text-xs text-[hsl(var(--muted-foreground))] mt-8">
        Última actividad registrada: 23 de enero de 2026, 09:15 — 190.235.12.4
      </div>
    </div>
  );
}
