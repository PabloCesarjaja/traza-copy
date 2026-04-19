import { Link } from "react-router-dom";
import { Mail, Lock, Eye } from "lucide-react";

export default function Login() {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.22em] text-gold-600 mb-3">RF-05 · Inicio de sesión</div>
      <h1 className="font-serif text-4xl title-underline mb-10">Bienvenido de vuelta</h1>

      <form className="space-y-4" onSubmit={(e)=>e.preventDefault()}>
        <div>
          <label className="block text-[12px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))] mb-2">Correo corporativo</label>
          <div className="relative">
            <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]"/>
            <input data-testid="login-email" type="email" defaultValue="mortiz@trazalegal.pe" className="field pl-10" placeholder="tu@despacho.com"/>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-[12px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))]">Contraseña</label>
            <a href="#" className="text-[11px] text-navy-800 hover:text-gold-600 underline underline-offset-2">¿Olvidaste tu contraseña?</a>
          </div>
          <div className="relative">
            <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]"/>
            <input data-testid="login-password" type="password" defaultValue="••••••••••" className="field pl-10 pr-10"/>
            <Eye size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] cursor-pointer"/>
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
          <input type="checkbox" defaultChecked className="accent-[hsl(var(--navy-800))]"/> Mantener sesión iniciada
        </label>

        <Link to="/casos" data-testid="login-submit" className="btn btn-primary w-full mt-2">Ingresar al despacho</Link>

        <div className="hr-fancy my-6"/>
        <div className="text-center text-sm text-[hsl(var(--muted-foreground))]">
          ¿Primera vez en TRAZA-Legal? <Link to="/registro" className="text-navy-800 font-medium underline underline-offset-2 hover:text-gold-600">Crear cuenta</Link>
        </div>
        <div className="text-center text-xs text-[hsl(var(--muted-foreground))]">
          ¿Eres cliente? <Link to="/portal/casos" className="text-navy-800 underline">Ingresa al portal →</Link>
        </div>
      </form>
    </div>
  );
}
