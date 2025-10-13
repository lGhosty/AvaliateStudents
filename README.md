# AvaliateStudents 🏡

## 1. Visão Geral do Projeto

O AvaliateStudents é uma plataforma full-stack projetada para ajudar estudantes a encontrar e avaliar moradias universitárias. Este repositório contém o código-fonte do aplicativo móvel (front-end) e da API REST (back-end), desenvolvidos para a disciplina de **Verificação e Validação de Sistemas**.

O objetivo desta primeira entrega é demonstrar uma base sólida de desenvolvimento, com funcionalidades essenciais implementadas e validadas através de testes de unidade.

---

## 2. Funcionalidades Implementadas (Entrega 01)

Para esta entrega, foram implementados 4 casos de uso principais no back-end, com suas respectivas interfaces no front-end:

-   **Autenticação de Usuários:**
    -   `POST /api/users/register`: Cadastro de novos usuários com criptografia de senha.
    -   `POST /api/users/login`: Autenticação de usuários existentes.
-   **Gerenciamento de Moradias:**
    -   `POST /api/moradias`: Cadastro de novas moradias no sistema.
    -   `GET /api/moradias`: Listagem de todas as moradias cadastradas.

---

## 3. Tecnologias Utilizadas

#### **Front-end (Mobile App)**
-   **Framework:** React Native com Expo
-   **Linguagem:** TypeScript
-   **Navegação:** Expo Router
-   **Estilização:** StyleSheet (Flexbox)

#### **Back-end (API)**
-   **Ambiente:** Node.js
-   **Framework:** Express.js
-   **Linguagem:** TypeScript
-   **Banco de Dados:** PostgreSQL
-   **ORM:** Prisma

#### **Verificação e Validação**
-   **Framework de Testes:** Jest
-   **Executor de Testes TS:** ts-jest
-   **Testes de API:** Supertest

---

## 4. Como Executar o Projeto

### Pré-requisitos
-   Node.js (v18 ou superior)
-   npm ou Yarn
-   PostgreSQL instalado e rodando
-   Expo Go (no seu celular)

### Back-end (API)
1.  Navegue até a pasta `server`: `cd server`
2.  Instale as dependências: `npm install`
3.  Configure o arquivo `.env` com a sua string de conexão do PostgreSQL.
4.  Aplique as migrações do banco: `npx prisma db push`
5.  Inicie o servidor: `npm run dev`
6.  (Opcional) Rode os testes de unidade: `npm test`

### Front-end (App)
1.  Em outro terminal, navegue até a pasta `app-mobile`: `cd app-mobile`
2.  Instale as dependências: `npm install`
3.  **Importante:** Nos arquivos que usam `fetch` (`login` e `register`), troque o endereço `localhost` pelo IP da sua máquina na rede local.
4.  Inicie o Expo: `npx expo start`
5.  Escaneie o QR Code com o aplicativo Expo Go.

---

## 5. Documentação de Apoio

-   **Diagrama de Casos de Uso:** (docs/casos-de-uso.png)
-   **Diagrama de Classes:** `/docs/diagrama-de-classes.png`
