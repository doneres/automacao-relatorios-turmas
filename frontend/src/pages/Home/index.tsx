import { useNavigate } from "react-router";
import { useTheme } from "../../contexts/ThemeContext";

export default function Home() {
  const navigate = useNavigate();
  const { colors, mode } = useTheme();

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          mode === "light"
            ? `linear-gradient(135deg, ${colors.bg.secondary} 0%, ${colors.bg.tertiary} 100%)`
            : `linear-gradient(135deg, ${colors.bg.primary} 0%, ${colors.bg.secondary} 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        color: colors.text.primary,
      }}
    >
      <div
        style={{
          maxWidth: 900,
          width: "100%",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div
            style={{
              fontSize: 64,
              marginBottom: 24,
              animation: "float 3s ease-in-out infinite",
            }}
          >
            <i
              className="bi bi-mortarboard"
              style={{ color: colors.accentPrimary }}
            ></i>
          </div>
          <h1
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: colors.text.primary,
              margin: "0 0 12px",
              background: "linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            AutoClass
          </h1>
          <p
            style={{
              fontSize: 16,
              color: colors.text.secondary,
              margin: 0,
            }}
          >
            Gere relatórios inteligentes de aulas em segundos com IA
          </p>
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
            marginBottom: 40,
          }}
        >
          {[
            {
              icon: "bi-file-earmark-text",
              title: "Relatórios",
              description: "Gere relatórios profissionais em segundos",
              path: "/relatorios",
            },
            {
              icon: "bi-lightning",
              title: "Rápido",
              description: "Processamento instantâneo com IA avançada",
              path: null,
            },
            {
              icon: "bi-sliders",
              title: "Configurações",
              description: "Personalize suas preferências",
              path: "/configuracoes",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => item.path && navigate(item.path)}
              style={{
                background:
                  mode === "light"
                    ? colors.card
                    : `linear-gradient(135deg, rgba(255,107,53,0.1) 0%, rgba(247,147,30,0.05) 100%)`,
                border:
                  mode === "light"
                    ? `1px solid ${colors.border}`
                    : "1px solid rgba(255,107,53,0.2)",
                borderRadius: 16,
                padding: 32,
                cursor: item.path ? "pointer" : "default",
                transition: "all 0.3s ease",
                textDecoration: "none",
                color: "inherit",
              }}
              onMouseEnter={(e) => {
                if (item.path) {
                  e.currentTarget.style.borderColor = colors.accentPrimary;
                  e.currentTarget.style.transform = "translateY(-4px)";
                  if (mode === "light") {
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(255,107,53,0.1)";
                  }
                }
              }}
              onMouseLeave={(e) => {
                if (item.path) {
                  e.currentTarget.style.borderColor =
                    mode === "light" ? colors.border : "rgba(255,107,53,0.2)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            >
              <div
                style={{
                  fontSize: 48,
                  marginBottom: 16,
                  color: colors.accentPrimary,
                }}
              >
                <i className={`bi ${item.icon}`}></i>
              </div>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: colors.text.primary,
                  margin: "0 0 8px",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: colors.text.secondary,
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => navigate("/relatorios")}
            style={{
              padding: "14px 32px",
              fontSize: 15,
              fontWeight: 600,
              color: "#fff",
              background: "linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",
              border: "none",
              borderRadius: 10,
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 8px 24px rgba(255,107,53,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 12px 32px rgba(255,107,53,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 8px 24px rgba(255,107,53,0.3)";
            }}
          >
            <i className="bi bi-arrow-right" style={{ marginRight: 8 }}></i>
            Começar Agora
          </button>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}
