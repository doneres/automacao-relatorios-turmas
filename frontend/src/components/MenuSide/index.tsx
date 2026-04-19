import { NavLink } from "react-router";
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Settings,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Props {
  open: boolean;
  onToggle: () => void;
}

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { path: "/relatorios", label: "Relatórios", icon: FileText, end: false },
  { path: "/conteudo-aula", label: "Conteúdo de Aula", icon: BookOpen, end: false },
  { path: "/configuracoes", label: "Configurações", icon: Settings, end: false },
];

export default function MenuSide({ open, onToggle }: Props) {
  return (
    <aside
      className={`
        flex flex-col h-screen
        bg-white dark:bg-slate-900
        border-r border-gray-200 dark:border-slate-800
        transition-all duration-300 ease-in-out
        shrink-0 overflow-hidden z-20
        ${open ? "w-64" : "w-16"}
      `}
    >
      {/* ─── Logo / Toggle ─── */}
      <div
        className={`flex items-center h-16 border-b border-gray-200 dark:border-slate-800 shrink-0 ${
          open ? "px-4 gap-3" : "justify-center"
        }`}
      >
        {open && (
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <img
              src="https://ctrlplay.com.br/wp-content/uploads/2024/11/logo-braco.svg"
              alt="CTRL+PLAY"
              className="h-9 w-auto shrink-0"
              style={{ filter: "drop-shadow(0 0 4px rgba(255,107,53,0.4))" }}
            />
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-900 dark:text-slate-100 truncate leading-tight">
                AutoClass
              </p>
              <p className="text-[10px] font-semibold text-brand tracking-widest uppercase truncate">
                CTRL+PLAY
              </p>
            </div>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg text-gray-400 dark:text-slate-500 hover:text-brand dark:hover:text-brand hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors shrink-0"
          title={open ? "Recolher menu" : "Expandir menu"}
        >
          {open ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      {/* ─── Nav ─── */}
      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            title={!open ? item.label : undefined}
            className={({ isActive }) =>
              `flex items-center rounded-lg transition-all duration-150 border
              ${open ? "gap-3 px-3 py-2.5" : "justify-center p-3"}
              ${
                isActive
                  ? "bg-brand/10 text-brand border-brand/20"
                  : "text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800/60 hover:text-gray-900 dark:hover:text-slate-200 border-transparent"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  size={18}
                  className={`shrink-0 ${isActive ? "text-brand" : ""}`}
                />
                {open && (
                  <span className="text-sm font-medium truncate">{item.label}</span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ─── Hub de Acesso Rápido ─── */}
      <div className="shrink-0 p-2 border-t border-gray-200 dark:border-slate-800">
        <a
          href="https://doneres.dev/hub-acesso-rapido/"
          target="_blank"
          rel="noopener noreferrer"
          title={!open ? "Hub de Acesso Rápido" : undefined}
          className={`flex items-center rounded-lg transition-all duration-150 border border-transparent hover:border-brand/20
            ${open ? "gap-3 px-2.5 py-2.5" : "justify-center p-3"}
            text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800/60 hover:text-brand dark:hover:text-brand group`}
        >
          <ExternalLink size={18} className="shrink-0" />
          {open && (
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-700 dark:text-slate-300 truncate group-hover:text-brand transition-colors leading-tight">
                Hub de Acesso
              </p>
              <p className="text-[10px] text-gray-400 dark:text-slate-500 truncate">doneres.dev</p>
            </div>
          )}
        </a>
      </div>
    </aside>
  );
}
