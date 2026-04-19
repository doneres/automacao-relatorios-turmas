import { useState } from "react";
import { Copy, Check, FileText } from "lucide-react";

interface Props {
  relatorio: string;
  loading: boolean;
}

export default function PainelRelatorio({ relatorio, loading }: Props) {
  const [copiado, setCopiado] = useState(false);

  const copiar = async () => {
    await navigator.clipboard.writeText(relatorio);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-5 flex flex-col min-h-0">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-gray-400 dark:text-slate-400" />
          <h2 className="text-sm font-semibold text-gray-800 dark:text-slate-200">Relatório</h2>
        </div>
        {relatorio && (
          <button
            onClick={copiar}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-150
              ${copiado
                ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                : "bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-400 hover:border-gray-300 dark:hover:border-slate-600"
              }`}
          >
            {copiado ? <Check size={13} /> : <Copy size={13} />}
            {copiado ? "Copiado!" : "Copiar"}
          </button>
        )}
      </div>

      <textarea
        readOnly
        value={relatorio}
        placeholder="Ao gerar o relatório, o resultado aparecerá aqui."
        className="flex-1 min-h-0 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-lg p-4 text-sm text-gray-800 dark:text-slate-300 placeholder-gray-400 dark:placeholder-slate-600 font-mono resize-none focus:outline-none leading-relaxed"
      />

      <div className="flex items-center gap-2 mt-3 text-xs text-gray-400 dark:text-slate-500">
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
            loading ? "bg-brand animate-pulse" : relatorio ? "bg-emerald-400" : "bg-gray-300 dark:bg-slate-600"
          }`}
        />
        {loading
          ? "Processando, aguarde..."
          : relatorio
          ? "Relatório gerado com sucesso."
          : "O resultado será exibido aqui."}
      </div>
    </div>
  );
}
