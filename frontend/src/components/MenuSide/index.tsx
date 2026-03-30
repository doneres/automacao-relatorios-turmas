import { NavLink } from "react-router";
import { useTheme } from "../../contexts/ThemeContext";

export default function MenuSide() {
  const { colors, mode } = useTheme();

  return (
    <aside
      className="d-flex flex-column h-100 p-3"
      style={{
        width: "240px",
        background: mode === "light" ? "#f5f7fa" : colors.bg.primary,
        borderRight: `1px solid ${colors.border}`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Logo */}
      <div
        className="d-flex justify-content-center align-items-center mb-4 p-3"
        style={{
          minHeight: "70px",
          borderRadius: 12,
          background: "linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",
        }}
      >
        <img
          src="https://ctrlplay.com.br/wp-content/uploads/2024/11/logo-braco.svg"
          alt="Logo"
          style={{ width: "70%", filter: "brightness(1.2)" }}
        />
      </div>

      {/* Navegação */}
      <nav className="d-flex flex-column gap-2" style={{ flex: 1 }}>
        {[
          { path: "/", icon: "bi-house-door", label: "Home" },
          { path: "/relatorios", icon: "bi-file-text", label: "Relatórios" },
          {
            path: "/conteudo-aula",
            icon: "bi-journal-code",
            label: "Conteúdo de aula",
          },
          {
            path: "/configuracoes",
            icon: "bi-sliders",
            label: "Configurações",
          },
        ].map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            style={({ isActive }) => ({
              padding: "12px 16px",
              borderRadius: 10,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 14,
              fontWeight: 500,
              border: "1px solid transparent",
              transition: "all 0.25s ease",
              background: isActive
                ? "linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)"
                : "transparent",
              color: isActive ? "#fff" : colors.text.secondary,
              borderColor: isActive ? "transparent" : colors.border,
            })}
          >
            <i className={`bi ${item.icon}`}></i>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Rodapé */}
      <div
        style={{
          textAlign: "center",
          fontSize: 12,
          color: colors.text.tertiary,
          paddingTop: 16,
          borderTop: `1px solid ${colors.border}`,
        }}
      >
        <p style={{ margin: "8px 0 0" }}>v1.0.0</p>
      </div>
    </aside>
  );
}
