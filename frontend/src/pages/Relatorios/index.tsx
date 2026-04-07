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

      const webhook = N8N_WEBHOOKS[dados.ambiente];
      if (!webhook)
        throw new Error(`Webhook não configurado para ${dados.ambiente}`);

      // Timeout de 5 minutos (AI pode demorar)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5 * 60 * 1000);

      let res: Response;
      try {
        res = await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeoutId);
      }

      // Lê como texto primeiro para debugar
      const rawText = await res.text();

      if (!res.ok) {
        throw new Error(
          `N8N retornou status ${res.status}: ${rawText || "(sem corpo)"}`,
        );
      }

      if (!rawText || rawText.trim() === "") {
        throw new Error(
          "N8N retornou resposta vazia. Verifique se o nó 'Respond to Webhook' está no final do workflow e se o workflow está publicado (não em modo teste).",
        );
      }

      let data: Record<string, unknown>;
      try {
        data = JSON.parse(rawText);
      } catch {
        throw new Error(
          `N8N retornou resposta inválida (não é JSON):\n${rawText.slice(0, 200)}`,
        );
      }

      const texto = data.relatorio ?? data.output ?? data.text;
      if (!texto || typeof texto !== "string") {
        throw new Error(
          `Campo 'relatorio' não encontrado. Resposta recebida:\n${JSON.stringify(data, null, 2)}`,
        );
      }

      setRelatorio(texto);
    } catch (e: unknown) {
      if (e instanceof Error && e.name === "AbortError") {
        setErro(
          "Timeout: o N8N demorou mais de 5 minutos para responder. Verifique o workflow.",
        );
      } else {
        setErro(
          `Falha: ${e instanceof Error ? e.message : "erro desconhecido"}`,
        );
      }
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
