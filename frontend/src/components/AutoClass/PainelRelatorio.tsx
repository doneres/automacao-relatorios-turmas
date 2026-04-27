import { useState, useEffect, useRef } from "react";
import { Copy, Check, FileText, Send, Loader2, AlertTriangle, Users, ChevronDown } from "lucide-react";
import type { GrupoWhatsapp } from "./types";

interface Props {
  relatorio: string;
  onRelatorioChange: (texto: string) => void;
  loading: boolean;
  grupos: GrupoWhatsapp[];
  grupoSelecionado: string;
  onGrupoChange: (id: string) => void;
  onEnviar: () => void;
  enviando: boolean;
  enviado: boolean;
  erroEnvio: string;
}

function GrupoAvatar({ foto, nome }: { foto: string | null; nome: string }) {
  if (foto) {
    return (
      <img
        src={foto}
        alt={nome}
        className="w-6 h-6 rounded-full object-cover shrink-0"
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />
    );
  }
  return (
    <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-slate-600 flex items-center justify-center shrink-0">
      <Users size={12} className="text-gray-400 dark:text-slate-400" />
    </div>
  );
}

function GrupoDropdown({
  grupos,
  selecionado,
  onChange,
}: {
  grupos: GrupoWhatsapp[];
  selecionado: string;
  onChange: (id: string) => void;
}) {
  const [aberto, setAberto] = useState(false);
  const [busca, setBusca] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const grupoAtual = grupos.find((g) => g.id === selecionado);

  const gruposFiltrados = grupos.filter((g) =>
    g.nome.toLowerCase().includes(busca.toLowerCase())
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setAberto(false);
        setBusca("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        className="w-full flex items-center gap-2 bg-gray-50 dark:bg-slate-600 border border-gray-200 dark:border-slate-500 rounded-lg px-3 py-2.5 text-sm text-left transition-colors hover:border-gray-300 dark:hover:border-slate-400 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/30"
      >
        {grupoAtual ? (
          <>
            <GrupoAvatar foto={grupoAtual.foto} nome={grupoAtual.nome} />
            <span className="flex-1 truncate text-gray-900 dark:text-slate-100">{grupoAtual.nome}</span>
          </>
        ) : (
          <>
            <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-slate-500 shrink-0" />
            <span className="flex-1 text-gray-400 dark:text-slate-500">Selecione o grupo da turma</span>
          </>
        )}
        <ChevronDown
          size={14}
          className={`shrink-0 text-gray-400 transition-transform duration-150 ${aberto ? "rotate-180" : ""}`}
        />
      </button>

      {aberto && (
        <div className="absolute z-50 bottom-full mb-1 w-full bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg shadow-lg">
          <div className="p-2 border-b border-gray-100 dark:border-slate-600">
            <input
              autoFocus
              type="text"
              placeholder="Buscar grupo..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full bg-gray-50 dark:bg-slate-600 border border-gray-200 dark:border-slate-500 rounded-md px-2.5 py-1.5 text-sm text-gray-800 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand"
            />
          </div>
          <div className="max-h-44 overflow-y-auto">
            {gruposFiltrados.length === 0 ? (
              <div className="px-3 py-4 text-sm text-gray-400 dark:text-slate-500 text-center">
                Nenhum grupo encontrado
              </div>
            ) : (
              gruposFiltrados.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => { onChange(g.id); setAberto(false); setBusca(""); }}
                  className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm text-left hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors last:rounded-b-lg ${
                    g.id === selecionado ? "bg-brand/5 dark:bg-brand/10" : ""
                  }`}
                >
                  <GrupoAvatar foto={g.foto} nome={g.nome} />
                  <span className="truncate text-gray-800 dark:text-slate-200">{g.nome}</span>
                  {g.id === selecionado && (
                    <Check size={13} className="shrink-0 text-brand ml-auto" />
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function PainelRelatorio({
  relatorio,
  onRelatorioChange,
  loading,
  grupos,
  grupoSelecionado,
  onGrupoChange,
  onEnviar,
  enviando,
  enviado,
  erroEnvio,
}: Props) {
  const [copiado, setCopiado] = useState(false);

  const copiar = async () => {
    await navigator.clipboard.writeText(relatorio);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl p-5 flex flex-col min-h-0 gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-gray-400 dark:text-slate-400" />
          <h2 className="text-sm font-semibold text-gray-800 dark:text-slate-200">Relatório</h2>
        </div>
        {relatorio && (
          <button
            onClick={copiar}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-150 ${
              copiado
                ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                : "bg-gray-50 dark:bg-slate-600 border-gray-200 dark:border-slate-500 text-gray-500 dark:text-slate-400 hover:border-gray-300 dark:hover:border-slate-400"
            }`}
          >
            {copiado ? <Check size={13} /> : <Copy size={13} />}
            {copiado ? "Copiado!" : "Copiar"}
          </button>
        )}
      </div>

      {/* Textarea */}
      <textarea
        value={relatorio}
        onChange={(e) => onRelatorioChange(e.target.value)}
        placeholder="Ao gerar o relatório, o resultado aparecerá aqui."
        className="flex-1 min-h-0 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg p-4 text-sm text-gray-800 dark:text-slate-300 placeholder-gray-400 dark:placeholder-slate-400 font-mono resize-none focus:outline-none leading-relaxed"
        style={{ minHeight: "200px" }}
      />

      {/* Status */}
      <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-slate-500">
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
            loading
              ? "bg-brand animate-pulse"
              : relatorio
              ? "bg-emerald-400"
              : "bg-gray-300 dark:bg-slate-600"
          }`}
        />
        {loading
          ? "Processando, aguarde..."
          : relatorio
          ? "Relatório gerado com sucesso."
          : "O resultado será exibido aqui."}
      </div>

      {/* Seção WhatsApp — só aparece quando há relatório */}
      {relatorio && (
        <div className="border-t border-gray-100 dark:border-slate-600 pt-4 flex flex-col gap-3">
          <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">
            Enviar no WhatsApp
          </p>

          <GrupoDropdown
            grupos={grupos}
            selecionado={grupoSelecionado}
            onChange={onGrupoChange}
          />

          <button
            onClick={onEnviar}
            disabled={!grupoSelecionado || enviando}
            className={`flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${
              enviado
                ? "bg-emerald-500 text-white"
                : "bg-brand-gradient text-white hover:opacity-90"
            }`}
          >
            {enviando ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Enviando...
              </>
            ) : enviado ? (
              <>
                <Check size={15} />
                Enviado!
              </>
            ) : (
              <>
                <Send size={15} />
                Enviar para o grupo
              </>
            )}
          </button>

          {erroEnvio && (
            <div className="flex items-start gap-2 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/25 rounded-lg px-3 py-2.5 text-rose-600 dark:text-rose-400 text-sm">
              <AlertTriangle size={15} className="shrink-0 mt-0.5" />
              <span>{erroEnvio}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
