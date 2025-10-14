# AvaliateStudents 🏡

![Status](https://img.shields.io/badge/status-entregue-green)
![Tecnologia](https://img.shields.io/badge/tecnologia-full--stack-blue)
![Plataforma](https://img.shields.io/badge/plataforma-mobile-lightgrey)

---

## 🎯 Sobre o Projeto

O **AvaliateStudents** é um projeto acadêmico full-stack que aborda um desafio real para estudantes universitários: a busca por moradias de qualidade.
A plataforma, composta por um **aplicativo móvel** e uma **API**, permite que estudantes encontrem, visualizem e avaliem repúblicas e apartamentos, trazendo mais **transparência e segurança** para a comunidade estudantil.

Este repositório consolida o trabalho realizado para as disciplinas de:

* **Programação para Dispositivos Móveis:** Focada na construção do aplicativo, integração com o back-end e uso de recursos nativos.
* **Verificação e Validação de Sistemas:** Focada na garantia da qualidade do back-end através de testes de unidade automatizados.

---

## 📑 Tabela de Conteúdos

1. [Funcionalidades Implementadas](#1--funcionalidades-implementadas)
2. [Tecnologias Utilizadas](#2--tecnologias-utilizadas)
3. [Checklist de Entregas](#3--checklist-de-entregas)
4. [Guia de Instalação e Execução](#4--guia-de-instalação-e-execução)
5. [Verificação e Testes](#5--verificação-e-testes)
6. [Documentação Adicional](#6--documentação-adicional)

---

## 1. ✨ Funcionalidades Implementadas

A fundação do sistema foi construída com as seguintes funcionalidades:

### ✅ **Autenticação de Usuários (Full-Stack)**

* 📱 **Cadastro e Login:** Interfaces no app para criar conta e entrar.
* ⚙️ **API de Autenticação:** Endpoints `POST /api/users/register` e `POST /api/users/login` com validação e criptografia de senha (`bcrypt`).
* 🧠 **Gerenciamento de Sessão:** O estado do usuário é mantido globalmente no app com `AuthContext`, garantindo uma experiência fluida.

### ✅ **Gerenciamento de Moradias (Back-end Verificado)**

* ⚙️ **Cadastrar Moradia (`POST /api/moradias`):** Criação de novas moradias no banco de dados.
* ⚙️ **Listar Moradias (`GET /api/moradias`):** Retorna todas as moradias cadastradas.
* 🧪 **Validação:** Ambas as funcionalidades foram verificadas com **testes de unidade automatizados**.

### ✅ **Perfil do Usuário e Integração Nativa**

* 📱 **Visualização de Perfil:** Exibe dinamicamente os dados do usuário autenticado.
* 📸 **Integração com o Dispositivo:** Permite trocar a foto de perfil acessando a **galeria de fotos** do celular (`expo-image-picker`).

---

## 2. 🛠️ Tecnologias Utilizadas

| Categoria              | Tecnologias                                           |
| :--------------------- | :---------------------------------------------------- |
| **Front-end (Mobile)** | `React Native`, `Expo`, `TypeScript`, `Expo Router`   |
| **Back-end (API)**     | `Node.js`, `Express.js`, `TypeScript`, `Prisma (ORM)` |
| **Banco de Dados**     | `PostgreSQL`                                          |
| **Testes (V&V)**       | `Jest`, `Supertest`, `ts-jest`                        |

---

## 3. ✅ Checklist de Entregas

Este projeto cumpre os requisitos de ambas as disciplinas, conforme descrito abaixo:

### **Programação para Dispositivos Móveis (Entrega 02)**

* [x] **+4 Casos de Uso e Diagrama de Classes:** Implementados via lógica e `schema.prisma`.
* [x] **4 Endpoints no Back-end:** `register`, `login`, `list-moradias`, `create-moradia`.
* [x] **3 Tabelas no PostgreSQL:** `Usuario`, `Moradia` e `Avaliacao`.
* [x] **Integração App & Back-end:** Fluxo de autenticação funcional.
* [x] **Funcionalidade Nativa:** Acesso à galeria de fotos com `expo-image-picker`.

### **Verificação e Validação de Sistemas (Entrega 01)**

* [x] **Diagrama de Casos de Uso e Repositório Git:** Estrutura completa.
* [x] **Protótipo de Alta Fidelidade:** Aplicativo funcional no Expo.
* [x] **Interfaces e Navegação:** Implementadas com `Expo Router`.
* [x] **+3 Casos de Uso no Back-end:** 4 casos de uso completos.
* [x] **Testes de Unidade:** Executados com sucesso para o back-end.

---

## 4. 🚀 Guia de Instalação e Execução (Sem Docker)

### **Passo 1: Pré-requisitos**

* [Node.js](https://nodejs.org/) (v18 ou superior)
* [Git](https://git-scm.com/)
* [PostgreSQL](https://www.postgresql.org/download/) instalado localmente

---

### **Passo 2: Clonar o Repositório**

```bash
git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
cd SEU-REPOSITORIO
```

---

### **Passo 3: Configurar o Banco de Dados e Back-end (API)**

1. Crie o banco de dados manualmente:

   ```sql
   CREATE DATABASE avaliatestudents;
   CREATE USER docker WITH PASSWORD 'docker';
   GRANT ALL PRIVILEGES ON DATABASE avaliatestudents TO docker;
   ```

2. Navegue até a pasta do servidor:

   ```bash
   cd server
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Configure as variáveis de ambiente criando um arquivo `.env`:

   ```env
   DATABASE_URL="postgresql://docker:docker@localhost:5432/avaliatestudents"
   ```

5. Crie as tabelas no banco com o Prisma:

   ```bash
   npx prisma db push
   ```

6. (Opcional) Visualize o banco com o Prisma Studio:

   ```bash
   npx prisma studio
   ```

7. Inicie o servidor:

   ```bash
   npm run dev
   ```

   ✅ O servidor estará rodando em [http://localhost:3333](http://localhost:3333).

---

### **Passo 4: Configurar o Front-end (App)**

1. Abra um novo terminal e vá até a pasta do aplicativo:

   ```bash
   cd app-mobile
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Ajuste o IP da API:

   * Descubra o IP local da sua máquina (exemplo: `192.168.0.102`).
   * Substitua `localhost:3333` por `SEU_IP:3333` nos arquivos que fazem requisições para a API.

4. Inicie o Expo:

   ```bash
   npx expo start
   ```

   ✅ Escaneie o **QR Code** com o aplicativo **Expo Go**.

---

## 5. 🧪 Verificação e Testes

A qualidade do **back-end** foi garantida com **testes de unidade automatizados**.

### Para executar os testes:

1. Navegue até a pasta `server`:

   ```bash
   cd server
   ```
2. Execute:

   ```bash
   npm test
   ```

💡 **Resultado esperado:**
Todas as suítes de teste devem retornar o status **PASS**.

---

## 6. 📚 Documentação Adicional

* 🗂️ **Diagrama de Casos de Uso:** `![Diagrama de Casos de Uso do Sistema](./app-mobile/docs/casos-de-uso.png)`
* 🧩 **Diagrama de Classes:** `/docs/diagrama-de-classes.png`
* 📱 **Protótipo Navegável:** *[➡️ Visualizar Protótipo no Figma](https://www.figma.com/design/a7OVs61HbxlT3c3tP8GyXr/Sem-t%C3%ADtulo?node-id=2-170&t=GlEIy3610zuiOu88-1)*

---

## 👨‍💻 Desenvolvido por

**Equipe AvaliateStudents**
Projeto acadêmico interdisciplinar — *Programação para Dispositivos Móveis* e *Verificação e Validação de Sistemas*.
© 2025 — Todos os direitos reservados.
