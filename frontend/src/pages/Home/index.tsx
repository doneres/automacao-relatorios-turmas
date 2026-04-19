import { Link } from "react-router";
import { FileText, BookOpen, ArrowRight, ExternalLink } from "lucide-react";
import { getUserName, getLinks } from "../../lib/storage";

function FeatureCard({
  title,
  description,
  to,
  icon: Icon,
  accentText,
  iconBg,
}: {
  title: string;
  description: string;
  to: string;
  icon: React.ElementType;
  accentText: string;
  iconBg: string;
}) {
  return (
    <Link
      to={to}
      className="group bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl p-6 hover:border-gray-300 dark:hover:border-slate-500 hover:shadow-sm transition-all duration-200 flex flex-col"
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${iconBg}`}
      >
        <Icon size={20} className={accentText} />
      </div>
      <h3 className="text-base font-semibold text-gray-900 dark:text-slate-100 mb-1.5">
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-slate-400 flex-1 leading-relaxed">
        {description}
      </p>
      <div
        className={`flex items-center gap-1.5 mt-4 text-sm font-medium ${accentText} opacity-0 group-hover:opacity-100 transition-opacity`}
      >
        Acessar
        <ArrowRight size={14} />
      </div>
    </Link>
  );
}

export default function Home() {
  const nome = getUserName();
  const links = getLinks();
  const hoje = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const hora = new Date().getHours();
  const saudacao =
    hora < 12 ? "Bom dia" : hora < 18 ? "Boa tarde" : "Boa noite";

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-medium text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-2 capitalize">
            {hoje}
          </p>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
            {saudacao}
            {nome ? `, ${nome}` : ""}
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1 leading-relaxed">
            Automatize relatórios e monte conteúdos de aula com inteligência
            artificial.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mb-8">
          <h2 className="text-xs font-medium text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">
            Módulos disponíveis
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FeatureCard
              title="Gerar Relatório"
              description="Envie a transcrição da aula (.srt) e gere um relatório completo com IA, pronto para enviar aos responsáveis."
              to="/relatorios"
              icon={FileText}
              accentText="text-brand"
              iconBg="bg-brand/10"
            />
            <FeatureCard
              title="Conteúdo de Aula"
              description="Selecione a ferramenta e o tema e deixe a IA montar um plano de aula personalizado para a sua turma."
              to="/conteudo-aula"
              icon={BookOpen}
              accentText="text-brand"
              iconBg="bg-brand/10"
            />
          </div>
        </div>

        {/* Hub Link */}
        {links.hubUrl && (
          <div>
            <h2 className="text-xs font-medium text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">
              Atalhos
            </h2>
            <a
              href={links.hubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl px-5 py-4 hover:border-brand/30 hover:shadow-sm transition-all duration-200 w-full max-w-sm"
            >
              <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-slate-600 flex items-center justify-center shrink-0">
                <ExternalLink
                  size={16}
                  className="text-gray-400 dark:text-slate-400 group-hover:text-brand transition-colors"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 dark:text-slate-200 group-hover:text-brand transition-colors">
                  {links.hubLabel || "Hub de Acesso Rápido"}
                </p>
                <p className="text-xs text-gray-400 dark:text-slate-500 truncate">
                  {links.hubUrl}
                </p>
              </div>
              <ArrowRight
                size={15}
                className="text-gray-300 dark:text-slate-600 group-hover:text-brand transition-colors shrink-0"
              />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
