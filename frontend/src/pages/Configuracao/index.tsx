import { useTheme } from "../../contexts/ThemeContext";

export default function Configuracao() {
  const { colors, mode, toggleTheme } = useTheme();

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          mode === "light"
            ? `linear-gradient(135deg, ${colors.bg.secondary} 0%, ${colors.bg.tertiary} 100%)`
            : `linear-gradient(135deg, ${colors.bg.primary} 0%, ${colors.bg.secondary} 100%)`,
        padding: "32px 20px",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ maxWidth: 900, margin: "0 auto 40px" }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: colors.text.primary,
            margin: "0 0 4px",
          }}
        >
          Configurações
        </h1>
        <p style={{ fontSize: 13, color: colors.text.tertiary, margin: 0 }}>
          Personalize suas preferências e ajustes da aplicação
        </p>
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          flex: 1,
          overflow: "auto",
          width: "100%",
        }}
      >
        {/* Seção 1 */}
        <div
          style={{
            background: colors.card,
            borderRadius: 14,
            border: `1px solid ${colors.border}`,
            padding: 32,
            marginBottom: 24,
          }}
        >
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: colors.text.primary,
              margin: "0 0 8px",
            }}
          >
            <i className="bi bi-bell"></i> Notificações
          </h2>
          <p
            style={{
              fontSize: 14,
              color: colors.text.tertiary,
              margin: "0 0 20px",
            }}
          >
            Gerencie suas preferências de notificação
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              "Notificações de conclusão",
              "Alertas de erro",
              "Dicas e sugestões",
            ].map((item) => (
              <label
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  cursor: "pointer",
                  fontSize: 14,
                  color: colors.text.primary,
                }}
              >
                <input
                  type="checkbox"
                  defaultChecked
                  style={{
                    width: 18,
                    height: 18,
                    cursor: "pointer",
                    accentColor: colors.accentPrimary,
                  }}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* Seção 2 */}
        <div
          style={{
            background: colors.card,
            borderRadius: 14,
            border: `1px solid ${colors.border}`,
            padding: 32,
            marginBottom: 24,
          }}
        >
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: colors.text.primary,
              margin: "0 0 8px",
            }}
          >
            <i className="bi bi-palette"></i> Aparência
          </h2>
          <p
            style={{
              fontSize: 14,
              color: colors.text.tertiary,
              margin: "0 0 20px",
            }}
          >
            Customize a aparência da aplicação
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px",
                background:
                  mode === "light"
                    ? "rgba(255,107,53,0.05)"
                    : "rgba(255,107,53,0.1)",
                borderRadius: 10,
                border: `1px solid ${colors.border}`,
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 14,
                    fontWeight: 600,
                    color: colors.text.primary,
                    marginBottom: 4,
                  }}
                >
                  Modo Noturno
                </label>
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    color: colors.text.tertiary,
                  }}
                >
                  {mode === "light"
                    ? "Ativar modo escuro"
                    : "Modo escuro ativado"}
                </p>
              </div>
              <button
                onClick={toggleTheme}
                style={{
                  background:
                    mode === "dark" ? colors.accentPrimary : colors.border,
                  border: "none",
                  borderRadius: 20,
                  padding: "8px 16px",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: 13,
                  color: mode === "dark" ? "#ffffff" : colors.text.primary,
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <i
                  className={`bi ${mode === "light" ? "bi-moon" : "bi-sun"}`}
                ></i>
                {mode === "light" ? "Ativar" : "Desativar"}
              </button>
            </div>
          </div>
        </div>

        {/* Seção 3 */}
        <div
          style={{
            background: colors.card,
            borderRadius: 14,
            border: `1px solid ${colors.border}`,
            padding: 32,
          }}
        >
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: colors.text.primary,
              margin: "0 0 8px",
            }}
          >
            <i className="bi bi-info-circle"></i> Sobre
          </h2>
          <div
            style={{
              fontSize: 14,
              color: colors.text.tertiary,
              lineHeight: 1.6,
            }}
          >
            <p style={{ margin: "0 0 8px" }}>
              <strong style={{ color: colors.text.primary }}>
                AutoClass v1.0.0
              </strong>
            </p>
            <p style={{ margin: 0 }}>
              Sistema inteligente de geração de relatórios de aulas via IA
            </p>
            <p
              style={{
                margin: "12px 0 0",
                fontSize: 12,
                color: colors.text.tertiary,
              }}
            >
              © 2026 CTRL+PLAY. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
