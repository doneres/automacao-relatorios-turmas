import { useState } from "react";
import type { DadosAula } from "../../components/AutoClass/types";
import { N8N_WEBHOOKS } from "../../components/AutoClass/types";
import { useTheme } from "../../contexts/ThemeContext";
import FormularioAula from "../../components/AutoClass/FormularioAula";
import PainelRelatorio from "../../components/AutoClass/PainelRelatorio";

const DADOS_INICIAIS: DadosAula = {
  ambiente: "PROD",
  turma: "",
  linkLoom: "",
  linkSlides: "",
  arquivo: null,
};

export default function Relatorios() {
  const { colors, mode } = useTheme();
  const [dados, setDados] = useState<DadosAula>(DADOS_INICIAIS);
  const [relatorio, setRelatorio] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleChange = (partial: Partial<DadosAula>) => {
    setDados((prev) => ({ ...prev, ...partial }));
  };

  const handleGerar = async () => {
    if (!dados.turma || !dados.linkLoom || !dados.arquivo) {
      setErro("Preencha turma, link do Loom e envie o arquivo .srt.");
      return;
    }
    setErro("");
    setLoading(true);
    setRelatorio("");

    try {
      const srtContent = await dados.arquivo.text();
      const payload = {
        ambiente: dados.ambiente,
        turma: dados.turma,
        linkLoom: dados.linkLoom,
        linkSlides: dados.linkSlides,
        transcricao: srtContent,
      };

      const res = await fetch(N8N_WEBHOOKS[dados.ambiente], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Erro ${res.status}`);
      const data = await res.json();
      setRelatorio(data.relatorio ?? JSON.stringify(data, null, 2));
    } catch (e: unknown) {
      setErro(
        `Falha ao conectar com o N8N: ${e instanceof Error ? e.message : "erro desconhecido"}`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background:
          mode === "light"
            ? `linear-gradient(135deg, ${colors.bg.secondary} 0%, ${colors.bg.tertiary} 100%)`
            : `linear-gradient(135deg, ${colors.bg.primary} 0%, ${colors.bg.secondary} 100%)`,
        padding: "20px 16px",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        color: colors.text.primary,
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{ maxWidth: 1200, margin: "0 auto 16px" }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: colors.text.primary,
            margin: "0 0 4px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <i
            className="bi bi-file-earmark-text"
            style={{ color: colors.accentPrimary, fontSize: 24 }}
          ></i>
          Gerar Relatório
        </h1>
        <p style={{ fontSize: 13, color: colors.text.secondary, margin: 0 }}>
          Preencha os dados da aula e envie a transcrição para gerar um
          relatório inteligente
        </p>
      </div>

      {/* Grid Layout */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          flex: 1,
          minHeight: 0,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <FormularioAula
          dados={dados}
          onChange={handleChange}
          onErro={setErro}
          onGerar={handleGerar}
          loading={loading}
          erro={erro}
        />
        <PainelRelatorio relatorio={relatorio} loading={loading} />
      </div>

      {/* Responsive Breakpoint */}
      <style>{`
        @media (max-width: 1024px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
