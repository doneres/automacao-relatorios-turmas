import { AlertTriangle, Zap, Loader2 } from "lucide-react";
import type { Ambiente, DadosAula } from "./types";
import { AMBIENTE_CONFIG } from "./types";
import UploadSrt from "./UploadSrt";

interface Props {
  dados: DadosAula;
  onChange: (d: Partial<DadosAula>) => void;
  onErro: (msg: string) => void;
  onGerar: () => void;
  loading: boolean;
  erro: string;
}

const inputCls =
  "w-full bg-gray-50 dark:bg-slate-600 border border-gray-200 dark:border-slate-500 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/30 transition-colors";

const labelCls =
  "block text-xs font-medium text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1.5";

export default function FormularioAula({ dados, onChange, onErro, onGerar, loading, erro }: Props) {
  const amb = AMBIENTE_CONFIG[dados.ambiente];

  return (
    <div className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl p-5 flex flex-col gap-4 overflow-y-auto">
      <div>
        <h2 className="text-base font-semibold text-gray-900 dark:text-slate-100">Dados da Aula</h2>
        <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">Preencha os campos abaixo para iniciar.</p>
      </div>

      {/* Ambiente */}
      <div>
        <label className={labelCls}>Ambiente</label>
        <select
          value={dados.ambiente}
          onChange={(e) => onChange({ ambiente: e.target.value as Ambiente })}
          className={`${inputCls} cursor-pointer appearance-none`}
        >
          {(Object.keys(AMBIENTE_CONFIG) as Ambiente[]).map((a) => (
            <option key={a} value={a} className="bg-white dark:bg-slate-600">
              {AMBIENTE_CONFIG[a].label}
            </option>
          ))}
        </select>
        <span className={`inline-flex items-center gap-1 mt-1.5 text-xs font-semibold px-2 py-0.5 rounded-md ${amb.bgClass} ${amb.textClass}`}>
          {amb.badge}
        </span>
      </div>

      {/* Turma */}
      <div>
        <label className={labelCls}>Turma</label>
        <input
          type="text"
          placeholder="#0000 - CY3"
          value={dados.turma}
          onChange={(e) => onChange({ turma: e.target.value })}
          className={inputCls}
        />
      </div>

      {/* Link Loom */}
      <div>
        <label className={labelCls}>Link da Gravação (Loom)</label>
        <input
          type="url"
          placeholder="https://www.loom.com/share/..."
          value={dados.linkLoom}
          onChange={(e) => onChange({ linkLoom: e.target.value })}
          className={inputCls}
        />
      </div>

      {/* Link Slides */}
      <div>
        <label className={labelCls}>
          Link dos Slides{" "}
          <span className="normal-case text-gray-300 dark:text-slate-600 font-normal">(opcional)</span>
        </label>
        <input
          type="url"
          placeholder="https://docs.google.com/presentation/..."
          value={dados.linkSlides}
          onChange={(e) => onChange({ linkSlides: e.target.value })}
          className={inputCls}
        />
      </div>

      {/* Upload SRT */}
      <div>
        <label className={labelCls}>Transcrição (.SRT)</label>
        <UploadSrt
          arquivo={dados.arquivo}
          onArquivo={(f) => onChange({ arquivo: f })}
          onErro={onErro}
        />
      </div>

      {/* Erro */}
      {erro && (
        <div className="flex items-start gap-2 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/25 rounded-lg px-3 py-2.5 text-rose-600 dark:text-rose-400 text-sm">
          <AlertTriangle size={15} className="shrink-0 mt-0.5" />
          <span>{erro}</span>
        </div>
      )}

      {/* Botão */}
      <button
        onClick={onGerar}
        disabled={loading}
        className="flex items-center justify-center gap-2 w-full py-3 bg-brand-gradient hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-lg transition-all duration-150 mt-auto shadow-sm"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Gerando relatório...
          </>
        ) : (
          <>
            <Zap size={16} />
            Gerar Relatório
          </>
        )}
      </button>
    </div>
  );
}
