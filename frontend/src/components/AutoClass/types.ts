export type Ambiente = "PROD" | "HML" | "DEV";

export interface DadosAula {
  ambiente: Ambiente;
  turma: string;
  linkLoom: string;
  linkSlides: string;
  arquivo: File | null;
}

export const AMBIENTE_CONFIG: Record<
  Ambiente,
  { label: string; badge: string; textClass: string; bgClass: string }
> = {
  PROD: {
    label: "Produção (PROD)",
    badge: "PROD",
    textClass: "text-emerald-400",
    bgClass: "bg-emerald-500/10",
  },
  HML: {
    label: "Homologação (HML)",
    badge: "HML",
    textClass: "text-amber-400",
    bgClass: "bg-amber-500/10",
  },
  DEV: {
    label: "Desenvolvimento (DEV)",
    badge: "DEV",
    textClass: "text-sky-400",
    bgClass: "bg-sky-500/10",
  },
};

export const N8N_WEBHOOKS: Record<Ambiente, string> = {
  PROD: "http://localhost:5678/webhook/d880dbd4-ec23-4ad3-84c8-4a3e619e14d4",
  HML: "",
  DEV: "http://localhost:5678/webhook-test/d880dbd4-ec23-4ad3-84c8-4a3e619e14d4",
};

export const N8N_WEBHOOKS_CONTEUDO: Record<Ambiente, string> = {
  PROD: "http://localhost:5678/webhook/conteudo-aula",
  HML: "",
  DEV: "http://localhost:5678/webhook-test/conteudo-aula",
};
