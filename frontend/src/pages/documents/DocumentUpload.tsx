import { Link, useParams } from "react-router-dom";
import { ArrowLeft, UploadCloud, FileText, X, CheckCircle2, Lock } from "lucide-react";
import { findCaso } from "@/mockData/data";

export default function DocumentUpload() {
  const { id } = useParams();
  const c = findCaso(id) || findCaso("CA-2026-0142");

  const files = [
    { name: "Contrato_adenda_firmado.pdf", size: "1.8 MB", progreso: 100, ok: true },
    { name: "Declaracion_testigo_J_Rios.docx", size: "420 KB", progreso: 67, ok: false },
    { name: "Recibos_honorarios_enero.zip", size: "3.2 MB", progreso: 12, ok: false },
  ];

  return (
    <div className="max-w-3xl">
      <Link to={`/casos/${c.id}/documentos`} className="inline-flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-navy-800 mb-5"><ArrowLeft size={14}/> Volver a documentos</Link>

      <div className="text-[11px] uppercase tracking-[0.22em] text-gold-600 mb-2">RF-03 · Subir documento</div>
      <h1 className="font-serif text-4xl title-underline mb-2">Subir documentos al expediente</h1>
      <p className="text-sm text-[hsl(var(--muted-foreground))] mb-8">Los archivos serán procesados por OCR para búsqueda semántica y asociados al caso <span className="font-mono text-navy-800">{c.id}</span>.</p>

      {/* Drop zone */}
      <div className="card-paper border-dashed border-2 border-[hsl(var(--line))] p-12 text-center bg-gradient-to-b from-[hsl(var(--muted))] to-transparent">
        <div className="w-16 h-16 rounded-full bg-navy-800 text-gold-500 mx-auto mb-4 flex items-center justify-center"><UploadCloud size={28}/></div>
        <h3 className="font-serif text-xl mb-2">Arrastra tus archivos aquí</h3>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">o haz click para seleccionar · PDF, DOCX, JPG, PNG, ZIP · máx 50 MB cada uno</p>
        <button data-testid="upload-select-btn" className="btn btn-primary">Seleccionar archivos</button>
      </div>

      {/* File queue */}
      <div className="mt-7">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-serif text-lg">Cola de subida <span className="text-sm text-[hsl(var(--muted-foreground))] font-sans">· 3 archivos</span></h3>
          <button className="text-xs text-[hsl(var(--muted-foreground))] hover:text-navy-800">Limpiar todo</button>
        </div>
        <div className="space-y-2">
          {files.map((f,i)=>(
            <div key={i} className="card-paper p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-md bg-red-50 text-red-700 flex items-center justify-center"><FileText size={18}/></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium truncate">{f.name}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[hsl(var(--muted-foreground))]">{f.size}</span>
                    {f.ok ? <CheckCircle2 size={16} className="text-emerald-600"/> : <button className="p-1 rounded hover:bg-[hsl(var(--muted))]"><X size={14}/></button>}
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-[hsl(var(--muted))] mt-2 overflow-hidden">
                  <div className={`h-full ${f.ok ? "bg-emerald-500" : "bg-gold-500"}`} style={{width:`${f.progreso}%`}}/>
                </div>
                <div className="text-[11px] text-[hsl(var(--muted-foreground))] mt-1">{f.ok ? "Completado · OCR procesado" : `${f.progreso}% · Subiendo...`}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Metadata form */}
      <div className="card-paper p-7 mt-7">
        <h3 className="font-serif text-xl mb-5">Metadatos (se aplicarán a todos los archivos)</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[12px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))] mb-2">Etiqueta</label>
            <select className="field"><option>Prueba</option><option>Demanda</option><option>Resolución</option><option>Pericia</option><option>Interno</option></select>
          </div>
          <div>
            <label className="block text-[12px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))] mb-2">Fase procesal</label>
            <select className="field"><option>Probatoria</option><option>Postulatoria</option><option>Decisoria</option><option>Ejecutoria</option></select>
          </div>
          <div className="col-span-2">
            <label className="block text-[12px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))] mb-2">Notas</label>
            <textarea className="field min-h-[70px]" placeholder="Opcional..."/>
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm mt-4"><input type="checkbox" className="accent-[hsl(var(--navy-800))]"/> <Lock size={13}/> Marcar como confidencial (solo equipo del caso)</label>
        <label className="flex items-center gap-2 text-sm mt-2"><input type="checkbox" defaultChecked className="accent-[hsl(var(--navy-800))]"/> Visible en el portal del cliente</label>
      </div>

      <div className="flex gap-3 mt-6">
        <Link to={`/casos/${c.id}/documentos`} className="btn btn-outline flex-1">Cancelar</Link>
        <button data-testid="upload-submit" className="btn btn-gold flex-1"><UploadCloud size={15}/> Subir 3 archivos</button>
      </div>
    </div>
  );
}
