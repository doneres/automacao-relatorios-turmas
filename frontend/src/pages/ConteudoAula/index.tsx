import { useState } from "react";
import {
  BookOpen, Zap, Copy, Check, AlertTriangle, Loader2,
  Wrench, Code2, Globe, Cpu, Gamepad2, Box, Grid3x3,
  Layers, Star, Monitor, Smartphone, Palette, Music, Pencil, Bot,
  Settings,
} from "lucide-react";
import { Link } from "react-router";
import type { Ambiente } from "../../components/AutoClass/types";
import { getWebhooksConteudo, getTools, type Ferramenta } from "../../lib/storage";

const ICON_MAP: Record<string, React.ElementType> = {
  Grid3x3, Code2, Gamepad2, Globe, Cpu, Box, Layers,
  BookOpen, Star, Wrench, Zap, Monitor, Smartphone,
  Palette, Music, Pencil, Bot,
};

const NIVEIS = ["Iniciante", "Intermediário", "Avançado"];
const AMBIENTES: Ambiente[] = ["PROD", "DEV"];

const inputCls =
  "w-full bg-gray-50 dark:bg-slate-600 border border-gray-200 dark:border-slate-500 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/30 transition-colors";

const labelCls =
  "block text-xs font-medium text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1.5";

function ToolCard({
  tool,
  selected,
  onClick,
}: {
  tool: Ferramenta;
  selected: boolean;
  onClick: () => void;
}) {
  const Icon = ICON_MAP[tool.icone] ?? Wrench;
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border text-left transition-all duration-150
        ${selected
          ? "bg-brand/10 border-brand/30 text-brand"
          : "bg-gray-50 dark:bg-slate-600 border-gray-200 dark:border-slate-500 text-gray-600 dark:text-slate-400 hover:border-gray-300 dark:hover:border-slate-400 hover:text-gray-800 dark:hover:text-slate-300"
        }`}
    >
      <Icon size={16} className="shrink-0" />
      <div className="min-w-0">
        <p className="text-xs font-semibold truncate">{tool.nome}</p>
        <p className="text-[10px] text-gray-400 dark:text-slate-500 truncate">{tool.descricao}</p>
      </div>
    </button>
  );
}

export default function ConteudoAula() {
  const tools = getTools();
  const [ferramenta, setFerramenta] = useState<Ferramenta | null>(null);
  const [turma, setTurma] = useState("");
  const [nivel, setNivel] = useState("");
  const [tema, setTema] = useState("");
  const [objetivos, setObjetivos] = useState("");
  const [ambiente, setAmbiente] = useState<Ambiente>("PROD");
  const [loading, setLoading] = useState(false);
  const [conteudo, setConteudo] = useState("");
  const [erro, setErro] = useState("");
  const [copiado, setCopiado] = useState(false);

  const handleGerar = async () => {
    if (!ferramenta || !turma || !nivel || !tema) {
      setErro("Selecione a ferramenta, preencha turma, nível e tema.");
      return;
    }
    setErro("");
    setLoading(true);
    setConteudo("");

    try {
      const webhooks = getWebhooksConteudo();
      const webhook = webhooks[ambiente];
      if (!webhook) throw new Error(`Webhook de conteúdo não configurado para ${ambiente}. Configure em Configurações > Ambientes.`);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5 * 60 * 1000);

      let res: Response;
      try {
        res = await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ferramenta: ferramenta.nome,
            turma,
            nivel,
            tema,
            objetivos,
          }),
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeoutId);
      }

      const rawText = await res.text();
      if (!res.ok) throw new Error(`N8N retornou status ${res.status}`);
      if (!rawText.trim()) throw new Error("N8N retornou resposta vazia.");

      let data: Record<string, unknown>;
      try {
        data = JSON.parse(rawText);
      } catch {
        throw new Error(`Resposta inválida:\n${rawText.slice(0, 200)}`);
      }

      const texto = data.conteudo ?? data.output ?? data.text;
      if (!texto || typeof texto !== "string")
        throw new Error(`Campo 'conteudo' não encontrado: ${JSON.stringify(data, null, 2)}`);

      setConteudo(texto);
    } catch (e: unknown) {
      if (e instanceof Error && e.name === "AbortError") {
        setErro("Timeout: N8N demorou mais de 5 minutos.");
      } else {
        setErro(`Falha: ${e instanceof Error ? e.message : "erro desconhecido"}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopiar = async () => {
    await navigator.clipboard.writeText(conteudo);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <BookOpen size={20} className="text-brand" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Conteúdo de Aula</h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-slate-400">
            Selecione a ferramenta e o tema para gerar um plano de aula com IA.
          </p>
        </div>
        <Link
          to="/configuracoes"
          onClick={() => {}}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 dark:text-slate-400 hover:text-brand bg-gray-100 dark:bg-slate-600 rounded-lg transition-colors"
          title="Gerenciar ferramentas"
        >
          <Settings size={13} />
          Gerenciar ferramentas
        </Link>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
        {/* Formulário */}
        <div className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl p-5 flex flex-col gap-4 overflow-y-auto">

          {/* Ferramenta */}
          <div>
            <label className={labelCls}>Ferramenta</label>
            {tools.length === 0 ? (
              <div className="text-sm text-gray-400 dark:text-slate-500 bg-gray-50 dark:bg-slate-600 rounded-lg p-4 text-center">
                Nenhuma ferramenta cadastrada.{" "}
                <Link to="/configuracoes" className="text-brand hover:underline">
                  Adicionar em Configurações.
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {tools.map((t) => (
                  <ToolCard
                    key={t.id}
                    tool={t}
                    selected={ferramenta?.id === t.id}
                    onClick={() => setFerramenta(t)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Turma */}
          <div>
            <label className={labelCls}>Turma</label>
            <input
              type="text"
              placeholder="#0000 - CY3"
              value={turma}
              onChange={(e) => setTurma(e.target.value)}
              className={inputCls}
            />
          </div>

          {/* Nível */}
          <div>
            <label className={labelCls}>Nível</label>
            <div className="flex gap-2">
              {NIVEIS.map((n) => (
                <button
                  key={n}
                  onClick={() => setNivel(n)}
                  className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-all duration-150
                    ${nivel === n
                      ? "bg-brand/10 border-brand/30 text-brand"
                      : "bg-gray-50 dark:bg-slate-600 border-gray-200 dark:border-slate-500 text-gray-500 dark:text-slate-400 hover:border-gray-300 dark:hover:border-slate-400"
                    }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Tema */}
          <div>
            <label className={labelCls}>Tema da Aula</label>
            <input
              type="text"
              placeholder="Ex: Introdução a variáveis"
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              className={inputCls}
            />
          </div>

          {/* Objetivos */}
          <div>
            <label className={labelCls}>
              Objetivos{" "}
              <span className="normal-case text-gray-300 dark:text-slate-600 font-normal">(opcional)</span>
            </label>
            <textarea
              rows={3}
              placeholder="O que os alunos devem aprender ao final da aula?"
              value={objetivos}
              onChange={(e) => setObjetivos(e.target.value)}
              className={`${inputCls} resize-none`}
            />
          </div>

          {/* Ambiente */}
          <div>
            <label className={labelCls}>Ambiente</label>
            <div className="flex gap-2">
              {AMBIENTES.map((a) => (
                <button
                  key={a}
                  onClick={() => setAmbiente(a)}
                  className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-all duration-150
                    ${ambiente === a
                      ? "bg-brand/10 border-brand/30 text-brand"
                      : "bg-gray-50 dark:bg-slate-600 border-gray-200 dark:border-slate-500 text-gray-500 dark:text-slate-400"
                    }`}
                >
                  {a}
                </button>
              ))}
            </div>
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
            onClick={handleGerar}
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full py-3 bg-brand-gradient hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-lg transition-all duration-150 mt-auto shadow-sm"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Gerando conteúdo...
              </>
            ) : (
              <>
                <Zap size={16} />
                Gerar Conteúdo
              </>
            )}
          </button>
        </div>

        {/* Painel de resultado */}
        <div className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl p-5 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800 dark:text-slate-200">Conteúdo Gerado</h2>
            {conteudo && (
              <button
                onClick={handleCopiar}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-150
                  ${copiado
                    ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                    : "bg-gray-50 dark:bg-slate-600 border-gray-200 dark:border-slate-500 text-gray-500 dark:text-slate-400 hover:border-gray-300 dark:hover:border-slate-400"
                  }`}
              >
                {copiado ? <Check size={13} /> : <Copy size={13} />}
                {copiado ? "Copiado!" : "Copiar"}
              </button>
            )}
          </div>

          <textarea
            readOnly
            value={conteudo}
            placeholder="O conteúdo gerado aparecerá aqui."
            className="flex-1 min-h-0 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg p-4 text-sm text-gray-800 dark:text-slate-300 placeholder-gray-400 dark:placeholder-slate-400 font-mono resize-none focus:outline-none leading-relaxed"
          />

          <div className="flex items-center gap-2 mt-3 text-xs text-gray-400 dark:text-slate-500">
            <span
              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                loading ? "bg-brand animate-pulse" : conteudo ? "bg-emerald-400" : "bg-gray-300 dark:bg-slate-600"
              }`}
            />
            {loading
              ? "Processando com IA..."
              : conteudo
              ? "Conteúdo gerado com sucesso."
              : "Aguardando geração."}
          </div>
        </div>
      </div>
    </div>
  );
}
