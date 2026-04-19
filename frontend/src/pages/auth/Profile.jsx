import { Camera, Key, ShieldCheck, Bell, Globe, Save } from "lucide-react";
import { currentUser } from "@/mockData/data";

export default function Profile() {
  return (
    <div className="max-w-5xl">
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-gold-600 mb-2">RF-05 · Perfil del usuario</div>
          <h1 className="font-serif text-4xl title-underline">Mi perfil</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-3">Actualiza tu información profesional, preferencias de notificación y credenciales de acceso.</p>
        </div>
        <button data-testid="profile-save" className="btn btn-gold"><Save size={15}/> Guardar cambios</button>
      </div>

      {/* Hero card */}
      <div className="card-paper overflow-hidden mb-6">
        <div className="h-28 bg-navy-grain"/>
        <div className="px-8 pb-7 -mt-12 flex items-end gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-md bg-gold-500 text-navy-950 text-3xl font-serif flex items-center justify-center border-4 border-white shadow-lg">{currentUser.avatar}</div>
            <button className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-navy-800 text-ivory flex items-center justify-center hover:bg-navy-900"><Camera size={13}/></button>
          </div>
          <div className="pb-2">
            <div className="font-serif text-2xl">{currentUser.nombre}</div>
            <div className="text-sm text-[hsl(var(--muted-foreground))] mt-0.5">{currentUser.correo}</div>
            <div className="flex items-center gap-2 mt-3">
              <span className="chip chip-navy">{currentUser.rol}</span>
              <span className="chip">{currentUser.colegiatura}</span>
              <span className="chip chip-gold">{currentUser.despacho}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Datos profesionales */}
        <div className="lg:col-span-2 card-paper p-7">
          <h3 className="font-serif text-xl mb-5">Datos profesionales</h3>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Nombres" value="María Fernanda"/>
            <Field label="Apellidos" value="Ortiz Ramírez"/>
            <Field label="DNI" value="45.872.109"/>
            <Field label="N° de colegiatura" value={currentUser.colegiatura}/>
            <Field label="Correo corporativo" value={currentUser.correo} type="email"/>
            <Field label="Teléfono" value={currentUser.telefono}/>
            <div className="col-span-2">
              <Field label="Despacho / firma" value={currentUser.despacho}/>
            </div>
            <div className="col-span-2">
              <label className="block text-[12px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))] mb-2">Biografía profesional</label>
              <textarea className="field min-h-[90px]" defaultValue="Abogada especialista en derecho civil y contencioso, 12 años de experiencia litigando ante los juzgados de Lima Centro y Lima Sur."/>
            </div>
          </div>
        </div>

        {/* Sidebar: security + preferences */}
        <div className="space-y-6">
          <div className="card-paper p-6">
            <div className="flex items-center gap-2 mb-4"><Key size={16} className="text-gold-600"/><h3 className="font-serif text-lg">Seguridad</h3></div>
            <button className="btn btn-outline w-full justify-between text-sm">Cambiar contraseña <span className="text-[hsl(var(--muted-foreground))]">→</span></button>
            <button className="btn btn-outline w-full justify-between text-sm mt-2"><span className="flex items-center gap-2"><ShieldCheck size={14}/> 2FA</span> <span className="chip chip-ok">Activa</span></button>
            <div className="text-xs text-[hsl(var(--muted-foreground))] mt-3">Último cambio de contraseña: hace 42 días.</div>
          </div>

          <div className="card-paper p-6">
            <div className="flex items-center gap-2 mb-4"><Bell size={16} className="text-gold-600"/><h3 className="font-serif text-lg">Notificaciones</h3></div>
            {["Nuevas tareas asignadas", "Mensajes de clientes", "Cambios en casos del equipo", "Recordatorios de audiencia"].map((t,i)=>(
              <label key={t} className="flex items-center justify-between py-2 text-sm border-b last:border-0 border-[hsl(var(--line))]">
                {t}<input type="checkbox" defaultChecked={i!==2} className="accent-[hsl(var(--navy-800))]"/>
              </label>
            ))}
          </div>

          <div className="card-paper p-6">
            <div className="flex items-center gap-2 mb-4"><Globe size={16} className="text-gold-600"/><h3 className="font-serif text-lg">Preferencias</h3></div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">Idioma<span className="chip">Español (Perú)</span></div>
              <div className="flex items-center justify-between text-sm">Zona horaria<span className="chip">GMT-5 Lima</span></div>
              <div className="flex items-center justify-between text-sm">Formato de fecha<span className="chip">dd/mm/aaaa</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, type="text" }) {
  return (
    <div>
      <label className="block text-[12px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))] mb-2">{label}</label>
      <input type={type} className="field" defaultValue={value}/>
    </div>
  );
}
