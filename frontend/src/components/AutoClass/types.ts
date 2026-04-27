export type Ambiente = "PROD" | "DEV";

export interface DadosAula {
  ambiente: Ambiente;
  turma: string;
  linkLoom: string;
  linkSlides: string;
  arquivo: File | null;
}

export interface GrupoWhatsapp {
  id: string;
  nome: string;
  foto: string | null;
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
  DEV: {
    label: "Desenvolvimento (DEV)",
    badge: "DEV",
    textClass: "text-sky-400",
    bgClass: "bg-sky-500/10",
  },
};

