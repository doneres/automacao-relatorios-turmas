import { useState } from "react";
import { FileText } from "lucide-react";
import type { DadosAula } from "../../components/AutoClass/types";
import { getWebhooksRelatorio } from "../../lib/storage";
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

      const webhooks = getWebhooksRelatorio();
      const webhook = webhooks[dados.ambiente];
      if (!webhook)
        throw new Error(`Webhook não configurado para ${dados.ambiente}. Configure em Configurações > Ambientes.`);

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

      const rawText = await res.text();

      if (!res.ok)
        throw new Error(`N8N retornou status ${res.status}: ${rawText || "(sem corpo)"}`);

      if (!rawText || rawText.trim() === "")
        throw new Error("N8N retornou resposta vazia. Verifique se o nó 'Respond to Webhook' está no final do workflow.");

      let data: Record<string, unknown>;
      try {
        data = JSON.parse(rawText);
      } catch {
        throw new Error(`N8N retornou resposta inválida (não é JSON):\n${rawText.slice(0, 200)}`);
      }

      const texto = data.relatorio ?? data.output ?? data.text;
      if (!texto || typeof texto !== "string")
        throw new Error(`Campo 'relatorio' não encontrado. Resposta:\n${JSON.stringify(data, null, 2)}`);

      setRelatorio(texto);
    } catch (e: unknown) {
      if (e instanceof Error && e.name === "AbortError") {
        setErro("Timeout: o N8N demorou mais de 5 minutos. Verifique o workflow.");
      } else {
        setErro(`Falha: ${e instanceof Error ? e.message : "erro desconhecido"}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2.5 mb-1">
          <FileText size={20} className="text-brand" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Gerar Relatório</h1>
        </div>
        <p className="text-sm text-gray-500 dark:text-slate-400">
          Preencha os dados da aula e envie a transcrição para gerar um relatório com IA.
        </p>
      </div>

      {/* Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
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
    </div>
  );
}
