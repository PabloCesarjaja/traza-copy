import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const requisitos = ["Mínimo 10 caracteres", "Una mayúscula y un número", "Un símbolo especial"];

export default function Register() {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.22em] text-gold-600 mb-3">RF-05 · Registro</div>
      <h1 className="font-serif text-4xl title-underline mb-8">Crea tu cuenta</h1>

      <form className="space-y-4" onSubmit={(e)=>e.preventDefault()}>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[12px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))] mb-2">Nombres</label>
            <input data-testid="reg-nombres" className="field" defaultValue="María Fernanda"/>
          </div>
          <div>
            <label className="block text-[12px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))] mb-2">Apellidos</label>
            <input data-testid="reg-apellidos" className="field" defaultValue="Ortiz Ramírez"/>
          </div>
        </div>
        <div>
          <label className="block text-[12px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))] mb-2">Correo corporativo</label>
          <input data-testid="reg-email" type="email" className="field" placeholder="nombre@despacho.com"/>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[12px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))] mb-2">Rol en el despacho</label>
            <select data-testid="reg-rol" className="field" defaultValue="Abogado">
              <option>Abogado</option>
              <option>Asistente/Paralegal</option>
              <option>Administrador</option>
              <option>Cliente</option>
            </select>
          </div>
          <div>
            <label className="block text-[12px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))] mb-2">N° de colegiatura</label>
            <input className="field" placeholder="CAL 00000" defaultValue="CAL 45872"/>
          </div>
        </div>
        <div>
          <label className="block text-[12px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))] mb-2">Contraseña</label>
          <input type="password" className="field" defaultValue="••••••••••••"/>
          <ul className="mt-3 space-y-1.5 text-xs">
            {requisitos.map((r,i)=>(
              <li key={r} className={`flex items-center gap-2 ${i<2 ? "text-emerald-700" : "text-[hsl(var(--muted-foreground))]"}`}>
                <span className={`w-4 h-4 rounded-full flex items-center justify-center ${i<2 ? "bg-emerald-100" : "bg-[hsl(var(--muted))]"}`}>
                  {i<2 ? <Check size={10}/> : <span className="w-1 h-1 rounded-full bg-current"/>}
                </span>
                {r}
              </li>
            ))}
          </ul>
        </div>

        <label className="flex items-start gap-2 text-xs text-[hsl(var(--muted-foreground))] mt-2">
          <input type="checkbox" className="accent-[hsl(var(--navy-800))] mt-0.5"/>
          <span>Acepto los <a href="#" className="underline text-navy-800">términos de uso</a> y la <a href="#" className="underline text-navy-800">política de confidencialidad</a> conforme a la Ley de Protección de Datos.</span>
        </label>

        <Link to="/login" data-testid="reg-submit" className="btn btn-primary w-full mt-2">Crear cuenta</Link>

        <div className="text-center text-sm text-[hsl(var(--muted-foreground))] pt-2">
          ¿Ya tienes cuenta? <Link to="/login" className="text-navy-800 font-medium underline underline-offset-2">Inicia sesión</Link>
        </div>
      </form>
    </div>
  );
}
