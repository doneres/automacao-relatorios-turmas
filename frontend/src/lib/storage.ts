export interface Ferramenta {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
}

export const DEFAULT_TOOLS: Ferramenta[] = [
  { id: "scratch", nome: "Scratch", descricao: "Programação visual em blocos", icone: "Grid3x3" },
  { id: "python", nome: "Python", descricao: "Linguagem de programação texto", icone: "Code2" },
  { id: "roblox", nome: "Roblox Studio", descricao: "Criação de jogos 3D", icone: "Gamepad2" },
  { id: "web", nome: "HTML / CSS / JS", descricao: "Desenvolvimento web", icone: "Globe" },
  { id: "arduino", nome: "Arduino", descricao: "Eletrônica e robótica", icone: "Cpu" },
  { id: "minecraft", nome: "Minecraft Edu", descricao: "Educação no Minecraft", icone: "Box" },
];

export const ICON_OPTIONS = [
  "Grid3x3", "Code2", "Gamepad2", "Globe", "Cpu", "Box",
  "Layers", "BookOpen", "Star", "Wrench", "Zap", "Monitor",
  "Smartphone", "Palette", "Music", "Pencil", "Blocks", "Bot",
];

const get = <T>(key: string, def: T): T => {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : def;
  } catch {
    return def;
  }
};

const set = <T>(key: string, val: T) => localStorage.setItem(key, JSON.stringify(val));

export const getTools = (): Ferramenta[] => get("cp-tools", DEFAULT_TOOLS);
export const saveTools = (tools: Ferramenta[]) => set("cp-tools", tools);

export const getUserName = (): string => localStorage.getItem("cp-user-name") ?? "";
export const saveUserName = (name: string) => localStorage.setItem("cp-user-name", name);

export interface WebhookConfig {
  PROD: string;
  HML: string;
  DEV: string;
}

export const DEFAULT_WEBHOOKS_RELATORIO: WebhookConfig = {
  PROD: "http://localhost:5678/webhook/d880dbd4-ec23-4ad3-84c8-4a3e619e14d4",
  HML: "",
  DEV: "http://localhost:5678/webhook-test/d880dbd4-ec23-4ad3-84c8-4a3e619e14d4",
};

export const DEFAULT_WEBHOOKS_CONTEUDO: WebhookConfig = {
  PROD: "http://localhost:5678/webhook/conteudo-aula",
  HML: "",
  DEV: "http://localhost:5678/webhook-test/conteudo-aula",
};

export const getWebhooksRelatorio = (): WebhookConfig =>
  get("cp-webhooks-relatorio", DEFAULT_WEBHOOKS_RELATORIO);
export const saveWebhooksRelatorio = (w: WebhookConfig) => set("cp-webhooks-relatorio", w);

export const getWebhooksConteudo = (): WebhookConfig =>
  get("cp-webhooks-conteudo", DEFAULT_WEBHOOKS_CONTEUDO);
export const saveWebhooksConteudo = (w: WebhookConfig) => set("cp-webhooks-conteudo", w);
