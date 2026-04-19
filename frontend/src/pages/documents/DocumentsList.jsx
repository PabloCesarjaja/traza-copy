import { Link, useParams } from "react-router-dom";
import { FileText, Upload, Download, MoreHorizontal, Search, Filter, FolderPlus, FileArchive, FileImage, File } from "lucide-react";
import { findCaso, documentos as allDocs, findUsuario } from "@/mockData/data";

const iconFor = (tipo) => {
  if (tipo==="pdf") return { Icon: FileText, color: "text-red-700 bg-red-50" };
  if (tipo==="docx") return { Icon: File, color: "text-blue-700 bg-blue-50" };
  if (tipo==="zip") return { Icon: FileArchive, color: "text-gold-600 bg-amber-50" };
  if (tipo==="img") return { Icon: FileImage, color: "text-emerald-700 bg-emerald-50" };
  return { Icon: File, color: "text-[hsl(var(--muted-foreground))] bg-[hsl(var(--muted))]" };
};

export default function DocumentsList() {
  const { id } = useParams();
  const c = findCaso(id) || findCaso("CA-2026-0142");
  const docs = allDocs.filter(d=>d.casoId===c.id);

  return (
    <div>
      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-gold-600 mb-2">RF-03 · Documentos del caso</div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="font-serif text-3xl">Documentos</h1>
            <span className="font-mono text-xs text-navy-800">{c.id}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline"><FolderPlus size={14}/> Nueva carpeta</button>
          <Link to={`/casos/${c.id}/documentos/subir`} data-testid="docs-upload-btn" className="btn btn-gold"><Upload size={15}/> Subir documento</Link>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <Stat v={docs.length} l="Total"/>
        <Stat v={docs.filter(d=>d.etiqueta==="Prueba").length} l="Pruebas"/>
        <Stat v={docs.filter(d=>d.etiqueta==="Resolución").length} l="Resoluciones"/>
        <Stat v="48.1 MB" l="Almacenamiento"/>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex-1 relative min-w-[260px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]"/>
          <input placeholder="Buscar documento..." className="field pl-10"/>
        </div>
        <select className="field w-auto"><option>Todas las etiquetas</option><option>Demanda</option><option>Prueba</option><option>Resolución</option></select>
        <button className="btn btn-outline"><Filter size={14}/> Ordenar</button>
      </div>

      <div className="card-paper overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[hsl(var(--muted))] text-left text-[11px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))]">
            <tr>
              <th className="px-5 py-3 font-medium w-1/2">Documento</th>
              <th className="px-5 py-3 font-medium">Etiqueta</th>
              <th className="px-5 py-3 font-medium">Subido por</th>
              <th className="px-5 py-3 font-medium">Fecha</th>
              <th className="px-5 py-3 font-medium">Tamaño</th>
              <th className="px-5 py-3"/>
            </tr>
          </thead>
          <tbody>
            {docs.map(d=>{
              const { Icon, color } = iconFor(d.tipo);
              const u = findUsuario(d.subidoPor);
              return (
                <tr key={d.id} className="border-t border-[hsl(var(--line))] hover:bg-[hsl(var(--muted))/0.4] transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-md ${color} flex items-center justify-center shrink-0`}><Icon size={18}/></div>
                      <div className="min-w-0">
                        <div className="font-medium truncate max-w-md">{d.nombre}</div>
                        <div className="text-[11px] text-[hsl(var(--muted-foreground))] font-mono">{d.id} · .{d.tipo}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5"><span className="chip chip-gold">{d.etiqueta}</span></td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-navy-800 text-gold-500 text-[10px] font-semibold flex items-center justify-center">{u?.avatar}</div>
                      <span className="text-[13px]">{u?.nombre.split(" ")[0]}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-[13px] text-[hsl(var(--muted-foreground))]">{d.fecha}</td>
                  <td className="px-5 py-3.5 text-[13px]">{d.peso}</td>
                  <td className="px-3 py-3.5 text-right">
                    <div className="flex gap-1 justify-end">
                      <button className="p-1.5 rounded hover:bg-[hsl(var(--muted))]" title="Descargar"><Download size={14}/></button>
                      <button className="p-1.5 rounded hover:bg-[hsl(var(--muted))]"><MoreHorizontal size={14}/></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const Stat = ({ v, l }) => (
  <div className="card-paper p-4">
    <div className="font-serif text-3xl text-navy-800">{v}</div>
    <div className="text-[11px] uppercase tracking-[0.16em] text-[hsl(var(--muted-foreground))] mt-1">{l}</div>
  </div>
);
