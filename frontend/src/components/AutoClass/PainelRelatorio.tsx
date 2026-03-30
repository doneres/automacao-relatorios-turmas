import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";

interface Props {
  relatorio: string;
  loading: boolean;
}

export default function PainelRelatorio({ relatorio, loading }: Props) {
  const { colors, mode } = useTheme();
  const [copiado, setCopiado] = useState(false);

  const copiar = async () => {
    await navigator.clipboard.writeText(relatorio);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

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
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        minHeight: 0,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h2
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: colors.text.primary,
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <i className="bi bi-file-earmark-text"></i>
          Relatório
        </h2>
        {relatorio && (
          <button
            onClick={copiar}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background:
                mode === "light" ? "#f5f7fa" : "rgba(255, 107, 53, 0.1)",
              border:
                mode === "light"
                  ? `1px solid ${colors.border}`
                  : "1px solid rgba(255, 107, 53, 0.3)",
              borderRadius: 8,
              padding: "8px 12px",
              fontSize: 12,
              fontWeight: 600,
              color: copiado ? "#4ade80" : colors.accentPrimary,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${mode === "light" ? "#eff2f5" : "rgba(255, 107, 53, 0.15)"}`;
              e.currentTarget.style.borderColor = colors.accentPrimary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `${mode === "light" ? "#f5f7fa" : "rgba(255, 107, 53, 0.1)"}`;
              e.currentTarget.style.borderColor = `${mode === "light" ? colors.border : "rgba(255, 107, 53, 0.3)"}`;
            }}
          >
            <i
              className={`bi ${copiado ? "bi-check-circle" : "bi-clipboard"}`}
            ></i>
            {copiado ? "Copiado!" : "Copiar"}
          </button>
        )}
      </div>

      <textarea
        readOnly
        value={relatorio}
        placeholder="Ao gerar o relatório, o resultado aparecerá aqui."
        style={{
          flex: 1,
          minHeight: 0,
          resize: "vertical",
          border:
            mode === "light"
              ? `1px solid ${colors.border}`
              : "1px solid rgba(255, 107, 53, 0.2)",
          borderRadius: 10,
          padding: 16,
          fontSize: 13,
          lineHeight: 1.6,
          fontFamily: "'Menlo', 'Courier New', monospace",
          color: relatorio ? colors.text.primary : colors.text.tertiary,
          background:
            mode === "light" ? colors.bg.tertiary : "rgba(0, 0, 0, 0.2)",
          outline: "none",
          boxSizing: "border-box",
          transition: "all 0.3s ease",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = colors.accentPrimary;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor =
            mode === "light" ? colors.border : "rgba(255, 107, 53, 0.2)";
        }}
      />

      <div
        style={{
          marginTop: 12,
          fontSize: 12,
          color: loading ? colors.accentPrimary : colors.text.secondary,
          display: "flex",
          alignItems: "center",
          gap: 6,
          transition: "color 0.3s ease",
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: loading ? colors.accentPrimary : "#4ade80",
            display: "inline-block",
            animation: loading ? "pulse 2s ease-in-out infinite" : "none",
          }}
        />
        {loading
          ? "Processando, aguarde..."
          : relatorio
            ? "Relatório gerado com sucesso!"
            : "O resultado será exibido aqui."}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
