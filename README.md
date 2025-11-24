# 📱 AvaliateStudents --- Plataforma de Moradias Universitárias

![Status](https://img.shields.io/badge/status-entregue-green)
![Tecnologia](https://img.shields.io/badge/tecnologia-full--stack-blue)
![Plataforma](https://img.shields.io/badge/plataforma-mobile-lightgrey)

O **AvaliateStudents** é um sistema **full-stack** desenvolvido para a
disciplina de *Desenvolvimento Mobile/Web*.\
A plataforma conecta **estudantes** a **moradias universitárias**,
permitindo busca, reservas, avaliações e interação entre alunos e
proprietários.

------------------------------------------------------------------------

## 📌 Tabela de Conteúdos

1.  Funcionalidades do Aplicativo\
2.  Funcionalidades do Servidor (Back-end)\
3.  Tecnologias\
4.  Como Rodar o Projeto\
5.  Gerenciamento do Banco de Dados\
6.  Estrutura do Banco\
7.  Testes Automatizados\
8.  Documentação Visual\
9.  Autor

------------------------------------------------------------------------

## 📱 Funcionalidades do Aplicativo

### 🔐 Autenticação

-   Login e Cadastro com validação
-   Senhas criptografadas (bcrypt)
-   Sessão via JWT + Context API

### 👤 Perfil do Usuário

-   Upload de foto (Câmera/Galeria)
-   Cache local
-   Edição de perfil

### 🏠 Moradias

-   Lista e busca com filtros
-   Cadastro com fotos e GPS
-   Edição e exclusão pelo proprietário

### 📅 Reservas

Fluxo completo aluno ↔ proprietário\
- Solicitação de datas\
- Aprovação/Rejeição\
- Acompanhamento pelo aluno

------------------------------------------------------------------------

## 💻 Funcionalidades do Servidor (Back-end)

-   API REST com Express + TypeScript\
-   Prisma ORM (PostgreSQL)\
-   Upload de imagens com Multer\
-   Autenticação JWT\
-   Estrutura para chat interno

------------------------------------------------------------------------

## 🛠 Tecnologias

  Categoria      Tecnologias
  -------------- ----------------------------------------------------
  **Mobile**     React Native (Expo), TypeScript, Navigation, Axios
  **Back-end**   Node.js, Express, TypeScript, Prisma, Multer, JWT
  **Infra**      PostgreSQL, Docker

------------------------------------------------------------------------

# 🚀 Como Rodar o Projeto

## 📌 Pré-requisitos

-   Node.js (v18+)\
-   PostgreSQL ou Docker\
-   Expo Go ou Emulador

------------------------------------------------------------------------

# 1️⃣ Configurar o Back-end

### 1. Instalar dependências

``` bash
cd server
npm install
```

### 2. Criar arquivo `.env` dentro de `/server`

``` env
DATABASE_URL="postgresql://postgres:12345@localhost:5432/avaliatestudents?schema=public"
JWT_SECRET="sua_chave_secreta"
```

> Substitua **12345** pela senha do seu PostgreSQL.

------------------------------------------------------------------------

# 2️⃣ Configurar o Banco de Dados

## ✅ Opção A --- Docker (recomendado)

``` bash
docker run --name avalia-db -e POSTGRES_PASSWORD=12345 -p 5432:5432 -d postgres:14
```

## ✅ Opção B --- Banco local

``` sql
CREATE DATABASE avaliatestudents;
ALTER USER postgres PASSWORD '12345';
```

------------------------------------------------------------------------

# 3️⃣ Criar Tabelas (Migrations)

``` bash
npx prisma migrate dev --name init
```

Se npx falhar:

``` bash
npm exec prisma migrate dev --name init
```

------------------------------------------------------------------------

# 4️⃣ Iniciar o Servidor

``` bash
npm run dev
```

Servidor disponível em:\
👉 http://localhost:3333

------------------------------------------------------------------------

# 5️⃣ Configurar o Aplicativo Mobile

### Instalar dependências

``` bash
cd app-mobile
npm install
```

### Ajustar IP do servidor

Arquivo: `app-mobile/constants/api.ts`

``` ts
export const IP_DO_BACKEND = "192.168.X.X";
```

### Executar o app

``` bash
npx expo start
```

Abra o **Expo Go** e escaneie o QR Code.

------------------------------------------------------------------------

# 🛠 Gerenciamento opcional via PgAdmin/DBeaver

    Host: localhost
    Porta: 5432
    Database: avaliatestudents
    Usuário: postgres
    Senha: 12345

------------------------------------------------------------------------

# 📂 Estrutura do Banco

  Tabela      Descrição
  ----------- ---------------------------
  Usuario     Login, senha, foto, papel
  Moradia     Imóvel, GPS, proprietário
  Reserva     Datas, status
  Avaliacao   Nota e comentário
  Mensagem    Chat interno

------------------------------------------------------------------------

# 🧪 Testes Automatizados

### Rodar testes

``` bash
cd server
npm install
npm test
```

### Exemplo de saída

    PASS src/__tests__/unit/moradia.service.spec.ts
    PASS src/__tests__/unit/auth.service.spec.ts
    PASS src/__tests__/integration/auth.routes.spec.ts

    Test Suites: 3 passed
    Tests: 9 passed

------------------------------------------------------------------------

## 📚 Documentação Visual

### 🧪 Evidências dos Testes
![Evidência dos Testes](./app-mobile/docs/testes-att.png)

### 🗂️ Diagrama de Casos de Uso
![Diagrama de Casos de Uso](./app-mobile/docs/casos-de-usos.png)

### 🧩 Diagrama de Classes
![Diagrama de Classes](./app-mobile/docs/diagrama-de-classes.png)

### 📱 Protótipo Navegável
> [➡️ Clique aqui para acessar o Figma](https://www.figma.com/design/a7OVs61HbxlT3c3tP8GyXr/Sem-t%C3%ADtulo?node-id=2-170&t=GlEIy3610zuiOu88-1)

------------------------------------------------------------------------

# 👨‍💻 Autor

Desenvolvido por **José Fernandes**, para a disciplina de
*Desenvolvimento Mobile/Web*.
