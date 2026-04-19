import { useState, useEffect } from "react";
import {
  Bell,
  Info,
  Link2,
  User,
  Moon,
  Sun,
  Plus,
  Trash2,
  Wrench,
  ExternalLink,
  Save,
  Code2,
  Globe,
  Cpu,
  Gamepad2,
  Box,
  Grid3x3,
  Layers,
  BookOpen,
  Star,
  Monitor,
  Smartphone,
  Palette,
  Music,
  Pencil,
  Zap,
  Bot,
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import {
  getUserName,
  saveUserName,
  getWebhooksRelatorio,
  saveWebhooksRelatorio,
  getWebhooksConteudo,
  saveWebhooksConteudo,
  getTools,
  saveTools,
  ICON_OPTIONS,
  type Ferramenta,
  type WebhookConfig,
} from "../../lib/storage";

const ICON_MAP: Record<string, React.ElementType> = {
  Grid3x3, Code2, Gamepad2, Globe, Cpu, Box,
  Layers, BookOpen, Star, Wrench, Zap, Monitor,
  Smartphone, Palette, Music, Pencil, Bot,
};

type Tab = "perfil" | "ambientes" | "ferramentas" | "sistema";

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "perfil", label: "Perfil", icon: User },
  { id: "ambientes", label: "Ambientes", icon: Link2 },
  { id: "ferramentas", label: "Ferramentas", icon: Wrench },
  { id: "sistema", label: "Sistema", icon: Info },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-3">
      {children}
    </h3>
  );
}

const inputCls =
  "w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/30 transition-colors";

export default function Configuracao() {
  const { isDark, toggleTheme } = useTheme();
  const [tab, setTab] = useState<Tab>("perfil");

  /* Perfil */
  const [nome, setNome] = useState(getUserName);
  const [nomeSaved, setNomeSaved] = useState(false);
  const saveNome = () => { saveUserName(nome); setNomeSaved(true); setTimeout(() => setNomeSaved(false), 2000); };

  /* Ambientes */
  const [whRelatorio, setWhRelatorio] = useState<WebhookConfig>(getWebhooksRelatorio);
  const [whConteudo, setWhConteudo] = useState<WebhookConfig>(getWebhooksConteudo);
  const [webhookSaved, setWebhookSaved] = useState(false);
  const saveWebhooks = () => {
    saveWebhooksRelatorio(whRelatorio);
    saveWebhooksConteudo(whConteudo);
    setWebhookSaved(true);
    setTimeout(() => setWebhookSaved(false), 2000);
  };

  /* Ferramentas */
  const [tools, setTools] = useState<Ferramenta[]>(getTools);
  const [novaFerramenta, setNovaFerramenta] = useState<Omit<Ferramenta, "id">>({
    nome: "", descricao: "", icone: "Wrench",
  });
  const [addMode, setAddMode] = useState(false);

  useEffect(() => { saveTools(tools); }, [tools]);

  const addTool = () => {
    if (!novaFerramenta.nome.trim()) return;
    setTools([...tools, { ...novaFerramenta, id: Date.now().toString() }]);
    setNovaFerramenta({ nome: "", descricao: "", icone: "Wrench" });
    setAddMode(false);
  };

  const removeTool = (id: string) => setTools(tools.filter((t) => t.id !== id));

  const ambs: (keyof WebhookConfig)[] = ["PROD", "HML", "DEV"];

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-2xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Configurações</h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
            Personalize o ambiente, perfil e ferramentas da aplicação.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 dark:bg-slate-800/50 rounded-xl p-1 mb-6">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium transition-all duration-150
                ${tab === id
                  ? "bg-white dark:bg-slate-800 text-brand shadow-sm border border-gray-200 dark:border-slate-700"
                  : "text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300"
                }`}
            >
              <Icon size={13} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* ── PERFIL ── */}
        {tab === "perfil" && (
          <div className="space-y-5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-6">
            <SectionTitle>Identificação</SectionTitle>
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Seu nome
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ex: João Silva"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className={inputCls}
                  onKeyDown={(e) => e.key === "Enter" && saveNome()}
                />
                <button
                  onClick={saveNome}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-brand-gradient text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity shrink-0"
                >
                  <Save size={14} />
                  {nomeSaved ? "Salvo!" : "Salvar"}
                </button>
              </div>
              <p className="text-xs text-gray-400 dark:text-slate-500 mt-1.5">
                Aparece na saudação da página inicial.
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
              <SectionTitle>Aparência</SectionTitle>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-slate-200">Modo Noturno</p>
                  <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">
                    {isDark ? "Tema escuro ativado" : "Tema claro ativado"}
                  </p>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`relative inline-flex h-7 w-12 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
                    isDark ? "bg-brand" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-flex h-6 w-6 items-center justify-center rounded-full bg-white shadow transition-transform duration-200 ${
                      isDark ? "translate-x-5" : "translate-x-0"
                    }`}
                  >
                    {isDark ? (
                      <Moon size={12} className="text-brand" />
                    ) : (
                      <Sun size={12} className="text-amber-500" />
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── AMBIENTES ── */}
        {tab === "ambientes" && (
          <div className="space-y-5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-6">
            <SectionTitle>Webhooks N8N — Relatórios</SectionTitle>
            {ambs.map((amb) => (
              <div key={`rel-${amb}`}>
                <label className="text-xs font-medium text-gray-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                  {amb}
                </label>
                <input
                  type="url"
                  placeholder={`http://localhost:5678/webhook/${amb.toLowerCase()}/...`}
                  value={whRelatorio[amb]}
                  onChange={(e) => setWhRelatorio({ ...whRelatorio, [amb]: e.target.value })}
                  className={inputCls}
                />
              </div>
            ))}

            <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
              <SectionTitle>Webhooks N8N — Conteúdo de Aula</SectionTitle>
              {ambs.map((amb) => (
                <div key={`cnt-${amb}`} className="mb-3 last:mb-0">
                  <label className="text-xs font-medium text-gray-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                    {amb}
                  </label>
                  <input
                    type="url"
                    placeholder={`http://localhost:5678/webhook/${amb.toLowerCase()}/conteudo`}
                    value={whConteudo[amb]}
                    onChange={(e) => setWhConteudo({ ...whConteudo, [amb]: e.target.value })}
                    className={inputCls}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={saveWebhooks}
              className="flex items-center gap-2 w-full justify-center py-2.5 bg-brand-gradient text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              <Save size={15} />
              {webhookSaved ? "Salvo!" : "Salvar Webhooks"}
            </button>
          </div>
        )}

        {/* ── FERRAMENTAS ── */}
        {tab === "ferramentas" && (
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <SectionTitle>Ferramentas cadastradas</SectionTitle>
              <button
                onClick={() => setAddMode((v) => !v)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-brand/10 text-brand rounded-lg text-xs font-semibold hover:bg-brand/20 transition-colors"
              >
                <Plus size={13} />
                Nova ferramenta
              </button>
            </div>

            {/* Add form */}
            {addMode && (
              <div className="mb-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 space-y-3">
                <input
                  type="text"
                  placeholder="Nome da ferramenta (ex: Godot)"
                  value={novaFerramenta.nome}
                  onChange={(e) => setNovaFerramenta({ ...novaFerramenta, nome: e.target.value })}
                  className={inputCls}
                />
                <input
                  type="text"
                  placeholder="Descrição curta"
                  value={novaFerramenta.descricao}
                  onChange={(e) => setNovaFerramenta({ ...novaFerramenta, descricao: e.target.value })}
                  className={inputCls}
                />
                <div>
                  <label className="text-xs text-gray-400 dark:text-slate-500 mb-1.5 block">Ícone</label>
                  <div className="flex flex-wrap gap-2">
                    {ICON_OPTIONS.filter((i) => ICON_MAP[i]).map((iconId) => {
                      const Icon = ICON_MAP[iconId];
                      return (
                        <button
                          key={iconId}
                          onClick={() => setNovaFerramenta({ ...novaFerramenta, icone: iconId })}
                          className={`p-2 rounded-lg border transition-all ${
                            novaFerramenta.icone === iconId
                              ? "bg-brand/10 border-brand/30 text-brand"
                              : "bg-gray-100 dark:bg-slate-700 border-transparent text-gray-400 dark:text-slate-400 hover:border-gray-300 dark:hover:border-slate-600"
                          }`}
                          title={iconId}
                        >
                          <Icon size={16} />
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={addTool}
                    className="flex-1 py-2 bg-brand-gradient text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Adicionar
                  </button>
                  <button
                    onClick={() => setAddMode(false)}
                    className="flex-1 py-2 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {/* Tools list */}
            <div className="space-y-2">
              {tools.map((tool) => {
                const Icon = ICON_MAP[tool.icone] ?? Wrench;
                return (
                  <div
                    key={tool.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800/50 rounded-lg border border-gray-100 dark:border-slate-700/50"
                  >
                    <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                      <Icon size={15} className="text-brand" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-slate-200 truncate">{tool.nome}</p>
                      <p className="text-xs text-gray-400 dark:text-slate-500 truncate">{tool.descricao}</p>
                    </div>
                    <button
                      onClick={() => removeTool(tool.id)}
                      className="p-1.5 rounded-md text-gray-300 dark:text-slate-600 hover:text-rose-500 hover:bg-rose-500/10 transition-colors shrink-0"
                      title="Remover"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                );
              })}
              {tools.length === 0 && (
                <p className="text-sm text-gray-400 dark:text-slate-500 text-center py-4">
                  Nenhuma ferramenta cadastrada. Adicione uma acima.
                </p>
              )}
            </div>
          </div>
        )}

        {/* ── SISTEMA ── */}
        {tab === "sistema" && (
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-6 space-y-4">
            <SectionTitle>Informações</SectionTitle>
            <div className="space-y-3">
              {[
                ["Versão", "1.0.0"],
                ["Plataforma", "CTRL+PLAY"],
                ["Backend", "N8N + Google Gemini"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-slate-800 last:border-0">
                  <span className="text-sm text-gray-500 dark:text-slate-400">{k}</span>
                  <span className="text-sm font-medium text-gray-800 dark:text-slate-200">{v}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <SectionTitle>Links</SectionTitle>
              <div className="space-y-2">
                <a
                  href="https://doneres.dev/hub-acesso-rapido/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-brand hover:underline"
                >
                  <ExternalLink size={14} />
                  Hub de Acesso Rápido
                </a>
                <a
                  href="http://localhost:5678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-brand hover:underline"
                >
                  <ExternalLink size={14} />
                  N8N Dashboard (local)
                </a>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 dark:border-slate-800">
              <Bell size={13} className="inline mr-1.5 text-gray-400 dark:text-slate-500" />
              <span className="text-xs text-gray-400 dark:text-slate-500">
                © 2026 CTRL+PLAY. Todos os direitos reservados.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
