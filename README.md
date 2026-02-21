# 🚀 DropManager

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-%2346E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

> **DropManager** é um sistema completo de gestão de produtos para Dropshipping, focado em precificação automática e controle de margem de lucro em tempo real.

---

## 📸 Preview

![Dashboard do Projeto](./dropfoto.png)

---

## 🌐 Acesso Online

O projeto está rodando em produção! Você pode acessar a versão mais recente através do link abaixo:

👉 **[https://drop-manager0.vercel.app](https://drop-manager0.vercel.app)**

---

## 🏗️ Arquitetura do Projeto (A "Santíssima Trindade")

Este projeto opera com uma arquitetura **Full Stack Distribuída**, utilizando três serviços principais que conversam entre si:

1.  **Frontend (Vercel):** Interface do usuário construída em **React + Tailwind CSS**. Responsável por toda a interação visual.
2.  **Backend (Render):** API robusta em **NestJS**. Processa as regras de negócio, cálculos de impostos e validações.
3.  **Database (Neon):** Banco de dados **PostgreSQL** Serverless. Onde os dados persistem com segurança.

### 🔄 Fluxo de Dados
`Usuário (Vercel)` ➡️ `API (Render)` ➡️ `Banco de Dados (Neon)`

---

## ✨ Funcionalidades

- **Dashboard Interativo:** Visualização rápida de métricas (Total de Produtos, Valor em Estoque).
- **Precificação Inteligente:** Cálculo automático do preço final baseado em:
    - Custo do Produto (USD)
    - Cotação do Dólar
    - Taxas de Importação
    - Margem de Lucro Desejada
- **Gestão de Produtos:** Criar, Listar e Excluir produtos instantaneamente.
- **UI Moderna:** Interface "Dark Mode" profissional utilizando **Tailwind CSS** e ícones **Lucide**.
- **Design Responsivo:** Funciona perfeitamente em Desktop e Mobile (com menu lateral adaptável).

---

## 🛠️ Tecnologias Utilizadas

### Frontend (`/web`)
- **React (Vite):** Biblioteca para construção da interface.
- **Tailwind CSS:** Framework de estilização utilitária.
- **Axios:** Cliente HTTP para comunicação com a API.
- **Lucide React:** Biblioteca de ícones moderna e leve.

### Backend (`/api`)
- **NestJS:** Framework Node.js progressivo e escalável.
- **TypeORM:** ORM para manipulação do banco de dados.
- **PostgreSQL:** Banco de dados relacional.
- **Class Validator:** Validação de dados de entrada (DTOs).

---

## 🚀 Como Rodar Localmente

### Pré-requisitos
- Node.js instalado (v18 ou superior).
- PostgreSQL instalado (ou uma URL de conexão externa).

### 1. Configurando o Backend (`api`)
```bash
# Entre na pasta da API
cd api

# Instale as dependências
npm install

# Crie um arquivo .env na raiz da pasta api
# Adicione sua conexão com o banco:
DATABASE_URL="postgresql://usuario:senha@localhost:5432/dropmanager"

# Rode as migrações (se necessário) ou inicie o servidor
npm run start:dev

O Backend rodará em: http://localhost:3000
```

### 2. Configurando o Frontend (`web`)
```bash

# Entre na pasta Web
cd web

# Instale as dependências
npm install

# Crie um arquivo .env na raiz da pasta web
VITE_API_URL="http://localhost:3000"

# Inicie o servidor frontend
npm run dev

O Frontend rodará em: http://localhost:5173
```

---

🔮 Roadmap (Próximos Passos)
[ ] Autenticação: Login de usuário (JWT) para proteger o acesso.

[ ] Relatórios: Gráficos de evolução de lucro e vendas.

[ ] Edição: Funcionalidade de editar produtos já cadastrados.

[ ] Integração: Conexão com APIs de cotação de dólar em tempo real.

---
