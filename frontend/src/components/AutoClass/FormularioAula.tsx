import type { Ambiente, DadosAula } from "./types";
import { AMBIENTE_CONFIG } from "./types";
import { useTheme } from "../../contexts/ThemeContext";
import UploadSrt from "./UploadSrt";

interface Props {
  dados: DadosAula;
  onChange: (d: Partial<DadosAula>) => void;
  onErro: (msg: string) => void;
  onGerar: () => void;
  loading: boolean;
  erro: string;
}

export default function FormularioAula({
  dados,
  onChange,
  onErro,
  onGerar,
  loading,
  erro,
}: Props) {
  const { colors, mode } = useTheme();
  const amb = AMBIENTE_CONFIG[dados.ambiente];

  return (
    <div
      style={{
        background:
          mode === "light"
            ? colors.card
            : "linear-gradient(135deg, rgba(255,107,53,0.1) 0%, rgba(247,147,30,0.05) 100%)",
        borderRadius: 14,
        border:
          mode === "light"
            ? `1px solid ${colors.border}`
            : "1px solid rgba(255,107,53,0.2)",
        padding: 16,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        overflow: "auto",
      }}
    >
      <h2
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: colors.text.primary,
          margin: "0 0 6px",
        }}
      >
        Dados da Aula
      </h2>
      <p
        style={{
          fontSize: 13,
          color: colors.text.secondary,
          margin: "0 0 24px",
        }}
      >
        Preencha os campos abaixo para iniciar.
      </p>

      {/* Ambiente */}
      <div style={{ marginBottom: 16 }}>
        <label
          style={{
            display: "block",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: 0.5,
            color: colors.text.secondary,
            marginBottom: 6,
            textTransform: "uppercase",
          }}
        >
          Ambiente
        </label>
        <select
          value={dados.ambiente}
          onChange={(e) => onChange({ ambiente: e.target.value as Ambiente })}
          style={
            {
              width: "100%",
              padding: "12px 14px",
              border: `1px solid ${colors.border}`,
              borderRadius: 10,
              fontSize: 14,
              fontFamily: "inherit",
              color: colors.text.primary,
              background:
                mode === "light" ? "#f5f7fa" : "rgba(255, 107, 53, 0.05)",
              boxSizing: "border-box",
              transition: "all 0.3s ease",
              appearance: "none",
              cursor: "pointer",
              paddingRight: 36,
              backgroundImage:
                mode === "light"
                  ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%231a1f2e' d='M1 1l5 5 5-5'/%3E%3C/svg%3E\")"
                  : "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23e8ecf1' d='M1 1l5 5 5-5'/%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
            } as React.CSSProperties
          }
        >
          {(Object.keys(AMBIENTE_CONFIG) as Ambiente[]).map((a) => (
            <option key={a} value={a}>
              {AMBIENTE_CONFIG[a].label}
            </option>
          ))}
        </select>
        <span
          style={{
            display: "inline-block",
            marginTop: 8,
            fontSize: 11,
            fontWeight: 600,
            padding: "4px 12px",
            borderRadius: 20,
            color: amb.color,
            background: amb.bg,
          }}
        >
          • {amb.badge}
        </span>
      </div>

      {/* Turma */}
      <div style={{ marginBottom: 16 }}>
        <label
          style={{
            display: "block",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: 0.5,
            color: colors.text.secondary,
            marginBottom: 6,
            textTransform: "uppercase",
          }}
        >
          Turma
        </label>
        <input
          type="text"
          placeholder="#0000 - CY3"
          value={dados.turma}
          onChange={(e) => onChange({ turma: e.target.value })}
          style={
            {
              width: "100%",
              padding: "12px 14px",
              border: `1px solid ${colors.border}`,
              borderRadius: 10,
              fontSize: 14,
              fontFamily: "inherit",
              color: colors.text.primary,
              background:
                mode === "light" ? "#f5f7fa" : "rgba(255, 107, 53, 0.05)",
              boxSizing: "border-box",
              transition: "all 0.3s ease",
            } as React.CSSProperties
          }
          onFocus={(e) => {
            e.currentTarget.style.borderColor = colors.accentPrimary;
            e.currentTarget.style.background = `${mode === "light" ? "#ffffff" : "rgba(255, 107, 53, 0.1)"}`;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = colors.border;
            e.currentTarget.style.background = `${mode === "light" ? "#f5f7fa" : "rgba(255, 107, 53, 0.05)"}`;
          }}
        />
      </div>

      {/* Link Loom */}
      <div style={{ marginBottom: 16 }}>
        <label
          style={{
            display: "block",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: 0.5,
            color: colors.text.secondary,
            marginBottom: 6,
            textTransform: "uppercase",
          }}
        >
          Link da Gravação (Loom)
        </label>
        <input
          type="url"
          placeholder="https://www.loom.com/share/..."
          value={dados.linkLoom}
          onChange={(e) => onChange({ linkLoom: e.target.value })}
          style={
            {
              width: "100%",
              padding: "12px 14px",
              border: `1px solid ${colors.border}`,
              borderRadius: 10,
              fontSize: 14,
              fontFamily: "inherit",
              color: colors.text.primary,
              background:
                mode === "light" ? "#f5f7fa" : "rgba(255, 107, 53, 0.05)",
              boxSizing: "border-box",
              transition: "all 0.3s ease",
            } as React.CSSProperties
          }
          onFocus={(e) => {
            e.currentTarget.style.borderColor = colors.accentPrimary;
            e.currentTarget.style.background = `${mode === "light" ? "#ffffff" : "rgba(255, 107, 53, 0.1)"}`;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = colors.border;
            e.currentTarget.style.background = `${mode === "light" ? "#f5f7fa" : "rgba(255, 107, 53, 0.05)"}`;
          }}
        />
      </div>

      {/* Link Slides */}
      <div style={{ marginBottom: 16 }}>
        <label
          style={{
            display: "block",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: 0.5,
            color: colors.text.secondary,
            marginBottom: 6,
            textTransform: "uppercase",
          }}
        >
          Link dos Slides{" "}
          <span
            style={{
              color: colors.text.tertiary,
              fontWeight: 400,
              textTransform: "none",
            }}
          >
            (opcional)
          </span>
        </label>
        <input
          type="url"
          placeholder="https://docs.google.com/presentation/..."
          value={dados.linkSlides}
          onChange={(e) => onChange({ linkSlides: e.target.value })}
          style={
            {
              width: "100%",
              padding: "12px 14px",
              border: `1px solid ${colors.border}`,
              borderRadius: 10,
              fontSize: 14,
              fontFamily: "inherit",
              color: colors.text.primary,
              background:
                mode === "light" ? "#f5f7fa" : "rgba(255, 107, 53, 0.05)",
              boxSizing: "border-box",
              transition: "all 0.3s ease",
            } as React.CSSProperties
          }
          onFocus={(e) => {
            e.currentTarget.style.borderColor = colors.accentPrimary;
            e.currentTarget.style.background = `${mode === "light" ? "#ffffff" : "rgba(255, 107, 53, 0.1)"}`;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = colors.border;
            e.currentTarget.style.background = `${mode === "light" ? "#f5f7fa" : "rgba(255, 107, 53, 0.05)"}`;
          }}
        />
      </div>

      {/* Upload SRT */}
      <div style={{ marginBottom: 16 }}>
        <label
          style={{
            display: "block",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: 0.5,
            color: colors.text.secondary,
            marginBottom: 6,
            textTransform: "uppercase",
          }}
        >
          Transcrição (.SRT)
        </label>
        <UploadSrt
          arquivo={dados.arquivo}
          onArquivo={(f) => onChange({ arquivo: f })}
          onErro={onErro}
        />
      </div>

      {/* Erro */}
      {erro && (
        <div
          style={{
            color: "#ff6b6b",
            fontSize: 13,
            marginBottom: 16,
            padding: "12px 14px",
            background: "rgba(255, 107, 107, 0.1)",
            borderRadius: 10,
            border: "1px solid rgba(255, 107, 107, 0.2)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <i
            className="bi bi-exclamation-triangle"
            style={{ fontSize: 16 }}
          ></i>
          {erro}
        </div>
      )}

      {/* Botão */}
      <button
        onClick={onGerar}
        disabled={loading}
        style={{
          width: "100%",
          padding: "13px",
          borderRadius: 10,
          border: "none",
          background: loading
            ? "linear-gradient(135deg, #ff8c42 0%, #ffb366 100%)"
            : "linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",
          color: "#fff",
          fontFamily: "inherit",
          fontSize: 15,
          fontWeight: 600,
          cursor: loading ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          transition: "all 0.3s ease",
          opacity: loading ? 0.8 : 1,
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 12px 32px rgba(255,107,53,0.4)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {loading ? (
          <>
            <span
              style={{
                display: "inline-block",
                width: 16,
                height: 16,
                border: "2px solid #fff",
                borderTopColor: "transparent",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }}
            />
            Gerando...
          </>
        ) : (
          <>
            <i className="bi bi-lightning"></i>
            Gerar Relatório
          </>
        )}
      </button>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
