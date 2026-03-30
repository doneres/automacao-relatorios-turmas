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
  { label: string; badge: string; color: string; bg: string }
> = {
  PROD: {
    label: "Produção (PROD)",
    badge: "PROD",
    color: "#166534",
    bg: "#dcfce7",
  },
  HML: {
    label: "Homologação (HML)",
    badge: "HML",
    color: "#92400e",
    bg: "#fef3c7",
  },
  DEV: {
    label: "Desenvolvimento (DEV)",
    badge: "DEV",
    color: "#1e40af",
    bg: "#dbeafe",
  },
};

export const N8N_WEBHOOKS: Record<Ambiente, string> = {
  PROD: "http://localhost:5678/webhook/d880dbd4-ec23-4ad3-84c8-4a3e619e14d4",
  HML: "",
  DEV: "http://localhost:5678/webhook-test/d880dbd4-ec23-4ad3-84c8-4a3e619e14d4",
};
