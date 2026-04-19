import { useRef, useState } from "react";
import type { DragEvent, ChangeEvent } from "react";
import { Upload, CheckCircle, X } from "lucide-react";

interface Props {
  arquivo: File | null;
  onArquivo: (f: File) => void;
  onErro: (msg: string) => void;
}

export default function UploadSrt({ arquivo, onArquivo, onErro }: Props) {
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    if (!f.name.endsWith(".srt")) {
      onErro("Apenas arquivos .srt são aceitos.");
      return;
    }
    onErro("");
    onArquivo(f);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (fileRef.current) fileRef.current.value = "";
    onArquivo(null as unknown as File);
    onErro("");
  };

  return (
    <div
      onClick={() => !arquivo && fileRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      className={`
        relative flex flex-col items-center justify-center gap-2 px-4 py-6 rounded-xl border-2 border-dashed
        transition-all duration-200
        ${arquivo
          ? "border-emerald-300 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/5 cursor-default"
          : dragging
          ? "border-brand/60 bg-brand/5 cursor-copy"
          : "border-gray-200 dark:border-slate-500 bg-gray-50 dark:bg-slate-600/50 hover:border-gray-300 dark:hover:border-slate-400 hover:bg-gray-100 dark:hover:bg-slate-600 cursor-pointer"
        }
      `}
    >
      {arquivo ? (
        <>
          <CheckCircle size={24} className="text-emerald-500 dark:text-emerald-400" />
          <div className="text-center">
            <p className="text-sm font-medium text-gray-800 dark:text-slate-200">{arquivo.name}</p>
            <p className="text-xs text-gray-400 dark:text-slate-500">{(arquivo.size / 1024).toFixed(1)} KB</p>
          </div>
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1 rounded-md text-gray-400 dark:text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
            title="Remover arquivo"
          >
            <X size={14} />
          </button>
        </>
      ) : (
        <>
          <Upload size={22} className={`transition-colors ${dragging ? "text-brand" : "text-gray-300 dark:text-slate-500"}`} />
          <div className="text-center">
            <p className={`text-sm font-medium transition-colors ${dragging ? "text-brand" : "text-gray-600 dark:text-slate-300"}`}>
              {dragging ? "Solte o arquivo aqui" : "Clique ou arraste o arquivo"}
            </p>
            <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">Apenas arquivos .srt</p>
          </div>
        </>
      )}
      <input
        ref={fileRef}
        type="file"
        accept=".srt"
        className="hidden"
        onChange={onFileChange}
      />
    </div>
  );
}
