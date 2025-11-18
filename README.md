# 📱 AvaliateStudents — Plataforma de Moradias Universitárias

![Status](https://img.shields.io/badge/status-entregue-green)
![Tecnologia](https://img-shields.io/badge/tecnologia-full--stack-blue)
![Plataforma](https://img.shields.io/badge/plataforma-mobile-lightgrey)

O **AvaliateStudents** é um sistema **full-stack** desenvolvido para a disciplina de *Desenvolvimento Mobile/Web*. A plataforma conecta **estudantes** a **moradias universitárias**, permitindo busca, reservas, avaliações e interação entre alunos e proprietários.

---

## 📌 Tabela de Conteúdos

1. [Funcionalidades do Aplicativo](#-funcionalidades-do-aplicativo)
2. [Funcionalidades do Servidor](#-funcionalidades-do-servidor-back-end)
3. [Tecnologias](#-tecnologias)
4. [Como Rodar o Projeto](#-como-rodar-o-projeto)
5. [Gerenciamento do Banco de Dados](#-gerenciamento-do-banco-de-dados-opcional)
6. [Estrutura do Banco](#-estrutura-do-banco)
7. [Autor](#-autor)

---

## 📱 Funcionalidades do Aplicativo

### 🔐 Autenticação

* Login e Cadastro com validação.
* Senhas criptografadas e autenticação JWT.
* Sessão mantida globalmente via Context API.

### 👤 Perfil do Usuário

* Upload de foto via **câmera ou galeria**.
* Foto salva no servidor e armazenada localmente.
* Edição de dados pessoais.

### 🏠 Moradias

* Listagem com **filtro de preço**.
* Cadastro de moradia com foto e **localização via GPS**.
* Edição e exclusão (somente pelo proprietário).

### 📅 Reservas — Fluxo Completo

* Aluno solicita reserva informando a data.
* Dono recebe solicitações em **“Gerenciar Aluguéis”**.
* Dono aprova ou rejeita.
* Aluno acompanha em **“Minhas Viagens”**.

---

## 💻 Funcionalidades do Servidor (Back-end)

* API REST completa com Node.js + Express.
* Banco PostgreSQL com **Prisma ORM**.
* Upload de imagens com **Multer**.
* Tokens JWT + criptografia Bcrypt.
* Docker integrado para o banco.
* Estrutura pronta para **chat** entre usuários.

---

## 🛠 Tecnologias

### **Front-end (Mobile)**

* React Native (Expo)
* TypeScript
* React Navigation
* Axios
* Expo Image Picker
* Expo Location

### **Back-end (API)**

* Node.js + Express
* TypeScript
* Prisma ORM
* Multer
* JWT
* Bcrypt

### **Banco & Infra**

* PostgreSQL
* Docker
* Prisma Migrate

---

## 🚀 Como Rodar o Projeto

### 📌 Pré-requisitos

* Node.js (v18+)
* Docker **ou** PostgreSQL
* App **Expo Go** ou Emulador

---

# 1️⃣ Configurar o Back-end

```bash
cd server
npm install
Criar o arquivo .env:DATABASE_URL="postgresql://postgres:docker@localhost:5432/avaliatestudents?schema=public"
JWT_SECRET="sua_chave_secreta"
Subir o banco com Docker:Bashdocker run --name avalia-db \
  -e POSTGRES_PASSWORD=docker \
  -p 5432:5432 \
  -d postgres:14
Criar e Aplicar Tabelas (Prisma Migrate):Este comando cria o banco de dados e aplica o esquema. Caso o esquema mude, basta rodar este comando novamente para aplicar as alterações.Bashnpx prisma migrate dev --name init
Iniciar o servidor:Bashnpm run dev
➡ O servidor rodará em: http://localhost:33332️⃣ Configurar o Aplicativo MobileBashcd app-mobile
npm install
Ajustar o IP da APIEdite o arquivo: app-mobile/constants/api.tsE coloque o IP da máquina na rede local:TypeScriptexport const IP_DO_BACKEND = "192.168.X.X";
Rodar o aplicativoBashnpx expo start
📱 Abra o Expo Go e escaneie o QR code.🛠️ Gerenciamento do Banco de Dados (Opcional)Para visualizar e editar os dados diretamente nas tabelas (como Usuario, Moradia, etc.), use um cliente gráfico:ConfiguraçãoValorFerramenta RecomendadaDBeaver Community EditionHostlocalhostPorta5432DatabaseavaliatestudentsUsuário/Senhapostgres/docker📂 Estrutura do BancoTabelaDescriçãoUsuarioLogin, senha (criptografada), foto e papel no sistema.MoradiaInformações do imóvel, localização (GPS) e proprietário.ReservaDatas, status e vínculo aluno → moradia.AvaliacaoNotas e comentários sobre moradias.MensagemEstrutura futura para chat interno.👨‍💻 AutorDesenvolvido por José Fernandes, para a disciplina de Desenvolvimento Mobile/Web.

📚 Documentação Adicional
* 🗂️ **Diagrama de Casos de Uso:*![Diagrama de Casos de Uso](./app-mobile/docs/casos-de-uso.png)
* 🧩 **Diagrama de Classes:*![Diagrama de Classes](./app-mobile/docs/diagrama-de-classe.png)
* 📱 **Protótipo Navegável:** *[➡️ Visualizar Protótipo no Figma](https://www.figma.com/design/a7OVs61HbxlT3c3tP8GyXr/Sem-t%C3%ADtulo?node-id=2-170&t=GlEIy3610zuiOu88-1)*


