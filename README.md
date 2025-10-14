# AvaliateStudents 🏡

![Status](https://img.shields.io/badge/status-entregue-green)
![Tecnologia](https://img.shields.io/badge/tecnologia-full--stack-blue)
![Plataforma](https://img.shields.io/badge/plataforma-mobile-lightgrey)

## 🎯 Sobre o Projeto

O **AvaliateStudents** é um projeto acadêmico full-stack, desenvolvido para a disciplina de **Programação para Dispositivos Móveis**. A plataforma, composta por um aplicativo móvel e uma API, permite que estudantes encontrem, visualizem e avaliem moradias universitárias, trazendo mais transparência e segurança para a comunidade.

---

### Tabela de Conteúdos
1.  [Funcionalidades Implementadas](#1--funcionalidades-implementadas)
2.  [Tecnologias Utilizadas](#2--tecnologias-utilizadas)
3.  [Checklist de Requisitos (Entrega 02)](#3--checklist-de-requisitos-entrega-02)
4.  [Guia de Instalação e Execução](#4--guia-de-instalação-e-execução)
5.  [Documentação Adicional](#5--documentação-adicional)

---

## 1. ✨ Funcionalidades Implementadas

A fundação do sistema foi construída com as seguintes funcionalidades:

-   ✅ **Autenticação de Usuários (Full-Stack):**
    -   📱 **Cadastro e Login:** Interfaces no app para criar conta e entrar.
    -   ⚙️ **API de Autenticação:** Endpoints `POST /api/users/register` e `POST /api/users/login` com validação e criptografia de senha (`bcrypt`).
    -   🧠 **Gerenciamento de Sessão:** O estado do usuário é mantido globalmente no app com `AuthContext`, garantindo uma experiência de navegação fluida.

-   ✅ **Gerenciamento de Moradias (Back-end):**
    -   ⚙️ **API para Cadastrar Moradia (`POST /api/moradias`):** Lógica implementada para salvar novas moradias no banco de dados.
    -   ⚙️ **API para Listar Moradias (`GET /api/moradias`):** Lógica implementada para buscar todas as moradias cadastradas.

-   ✅ **Perfil do Usuário e Integração Nativa:**
    -   📱 **Visualização de Perfil:** Exibe dinamicamente os dados do usuário que fez login.
    -   📸 **Integração com Dispositivo:** Permite que o usuário troque sua foto de perfil acessando a **galeria de fotos** do celular (`expo-image-picker`).

---

## 2. 🛠️ Tecnologias Utilizadas

| Categoria | Tecnologia |
| :--- | :--- |
| **Front-end (Mobile)** | `React Native`, `Expo`, `TypeScript`, `Expo Router` |
| **Back-end (API)** | `Node.js`, `Express.js`, `TypeScript`, `Prisma (ORM)` |
| **Banco de Dados** | `PostgreSQL` |

---

## 3. ✅ Checklist de Requisitos (Entrega 02)

Este projeto cumpre todos os requisitos da Entrega 02 de Programação para Dispositivos Móveis:

-   [x] **+4 Casos de Uso e Diagrama de Classes:** Lógica e `schema.prisma` implementados e diagramas criados.
-   [x] **4 Endpoints no Back-end:** `register`, `login`, `list-moradias`, `create-moradia`.
-   [x] **3 Tabelas no PostgreSQL:** `Usuario`, `Moradia` e `Avaliacao`.
-   [x] **Integração App & Back-end:** Fluxo de autenticação 100% funcional.
-   [x] **Funcionalidade do Dispositivo:** Acesso à galeria de fotos do celular.

---

🚀 Guia de Instalação e Execução
Siga este guia para configurar e rodar o projeto em sua máquina local.

Passo 1: Pré-requisitos

Antes de começar, garanta que você tenha as seguintes ferramentas instaladas:

Node.js (v18+)

Git

Docker (Recomendado para o banco de dados)

Passo 2: Clonar o Repositório

Use o Git para clonar o projeto e acesse o diretório criado:

Bash
git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
cd SEU-REPOSITORIO
Passo 3: Configurar o Back-end (API)

⚙️ No primeiro terminal, vamos configurar e iniciar o servidor.

Acesse a pasta do servidor:

Bash
cd server
Instale as dependências:

Bash
npm install
Inicie o Banco de Dados com Docker:
O comando abaixo cria e executa um container PostgreSQL pronto para uso.

Bash
docker run --name pg-avaliate -e POSTGRES_USER=docker -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=avaliatestudents -p 5432:5432 -d postgres
Configure as Variáveis de Ambiente:
Crie um arquivo .env na pasta server com a seguinte linha:

Snippet de código
DATABASE_URL="postgresql://docker:docker@localhost:5432/avaliatestudents"
Crie as Tabelas no Banco:
Este comando usa o Prisma para criar a estrutura do banco de dados.

Bash
npx prisma db push
Inicie o servidor:

Bash
npm run dev
✅ Sucesso! O servidor estará rodando em http://localhost:3333.

Passo 4: Configurar o Front-end (App)

📱 Abra um novo terminal para configurar e rodar o aplicativo.

Acesse a pasta do aplicativo (a partir da raiz do projeto):

Bash
cd app-mobile
Instale as dependências:

Bash
npm install
Ajuste o IP da API:
Para que o app no celular se conecte ao servidor, encontre o IP da sua máquina na rede local (ex: 192.168.0.102). Em seguida, nos arquivos do app, substitua a URL localhost:3333 por SEU_IP:3333.

Inicie o Expo:

Bash
npx expo start
✅ Sucesso! Escaneie o QR Code com o aplicativo Expo Go no seu celular.

## 4. 📚 Documentação Adicional
* 🗂️ **Diagrama de Casos de Uso:*![Diagrama de Casos de Uso](./app-mobile/docs/casos-de-uso.png)
* 🧩 **Diagrama de Classes:*![Diagrama de Classes](./app-mobile/docs/diagrama-de-classe.png)
* 📱 **Protótipo Navegável:** *[➡️ Visualizar Protótipo no Figma](https://www.figma.com/design/a7OVs61HbxlT3c3tP8GyXr/Sem-t%C3%ADtulo?node-id=2-170&t=GlEIy3610zuiOu88-1)*

