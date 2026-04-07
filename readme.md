# Automação de Relatórios de Aula

## Sobre o Projeto

Aplicação web que automatiza a geração de relatórios de aula através de inteligência artificial. O projeto utiliza **React + TypeScript** no frontend, **N8N** como orquestrador de workflows no backend, e integra o modelo de IA **Google Gemini** para gerar relatórios de forma inteligente e eficiente.

### Objetivo
Substituir o processo manual de criação de relatórios de aula por uma solução automatizada que economiza tempo e garante consistência.

---

## Como Começar

### Pré-requisitos
- [Docker Desktop](https://www.docker.com/get-started/) instalado
- Contas gratuitas em:
  - [Google AI Studio](https://aistudio.google.com/app/apikey) (para Gemini)
  - [SerpAPI](https://serpapi.com/) (para buscas)

### 1. Clonar o Repositório
```bash
git clone https://github.com/doneres/automacao-relatorios-turmas.git

cd automacao-relatorios
```

### 2. Iniciar os Containers
```bash
docker-compose up -d
```

Isso iniciará automaticamente:
- **Frontend** (React + TypeScript) na porta `80`
- **N8N** (Backend/Workflows) na porta `5678`

### 3. Obter as Chaves de API

#### Google Gemini
1. Acesse [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Clique em "Create API Key"
3. Copie a chave gerada

#### SerpAPI
1. Acesse [SerpAPI](https://serpapi.com/) (lhe dará acesso a 250 pesquisas)
2. Crie uma conta gratuita
3. Na dashboard, copie sua chave API

### 4. Cadastrar as Chaves no N8N

1. Abra `http://localhost:5678` no navegador
2. complete o setup inicial do N8N
3. Acesse o workflow disponível
4. Em cada nó que usa API externa, configure a credencial:
   - **Google Gemini**: Cole a chave do Google AI Studio
   - **SerpAPI**: Cole a chave do SerpAPI
5. Salve as credenciais

---

## Funcionalidades

✅ Geração automática de relatórios de aula  
✅ Integração com IA (Google Gemini)  
✅ Busca automática de conteúdos adicionais (SerpAPI)  
✅ Interface intuitiva em React  
✅ Workflows personalizáveis no N8N  

---

## Tecnologias Utilizadas

- **Frontend**: React 18, TypeScript, Vite
- **Backend**: N8N (Workflow Automation)
- **IA**: Google Gemini Chat Model
- **Busca**: SerpAPI
- **Containerização**: Docker, Docker Compose

---

## Como Usar

1. Acesse `http://localhost:80` (Frontend)
2. Preencha os dados da aula
3. Carregue material adicional (se necessário)
4. Clique em "Gerar Relatório"
5. A IA processará e gerará o relatório automaticamente

---

## Contribuindo

Sinta-se livre para contribuir com melhorias, correções ou novas funcionalidades.


---

## ❓ Dúvidas?

Abra uma issue no repositório GitHub ou entre em contato.
