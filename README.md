# 📱 AvaliateStudents — Plataforma de Moradias Universitárias

O AvaliateStudents é um sistema full-stack desenvolvido para a disciplina de Desenvolvimento Mobile/Web. A plataforma conecta estudantes a moradias universitárias, permitindo busca, reservas, avaliações e interação entre alunos e proprietários.

---

## 📌 Tabela de Conteúdos

- [Funcionalidades do Aplicativo](#funcionalidades-do-aplicativo)
- [Funcionalidades do Servidor](#funcionalidades-do-servidor-back-end)
- [Tecnologias](#tecnologias)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
- [Gerenciamento do Banco de Dados](#gerenciamento-do-banco-de-dados)
- [Estrutura do Banco](#estrutura-do-banco)
- [Autor](#autor)

---

## 📱 Funcionalidades do Aplicativo

### 🔐 Autenticação
- Login e Cadastro com validação.
- Senhas criptografadas e autenticação JWT.
- Sessão mantida globalmente via Context API.

### 👤 Perfil do Usuário
- Upload de foto via câmera ou galeria.
- Foto salva no servidor e armazenada localmente.
- Edição de dados pessoais.

### 🏠 Moradias
- Listagem com filtro de preço.
- Cadastro de moradia com foto e localização via GPS.
- Edição e exclusão (somente pelo proprietário).

### 📅 Reservas — Fluxo Completo
- Aluno solicita reserva informando a data.
- Dono recebe solicitações em “Gerenciar Aluguéis”.
- Dono aprova ou rejeita.
- Aluno acompanha em “Minhas Viagens”.

---

## 💻 Funcionalidades do Servidor (Back-end)
- API REST completa com Node.js + Express.
- Banco PostgreSQL com Prisma ORM.
- Upload de imagens com Multer.
- Tokens JWT + criptografia Bcrypt.
- Docker integrado para o banco.
- Estrutura pronta para chat entre usuários.

---

## 🛠 Tecnologias

**Front-end (Mobile)**
- React Native (Expo)
- TypeScript
- React Navigation
- Axios
- Expo Image Picker
- Expo Location

**Back-end (API)**
- Node.js + Express
- TypeScript
- Prisma ORM
- Multer
- JWT
- Bcrypt

**Banco & Infra**
- PostgreSQL
- Docker (opcional)
- Prisma Migrate

---

## 🚀 Como Rodar o Projeto

### 📌 Pré-requisitos
- Node.js (v18+)
- PostgreSQL (ou Docker)
- Expo Go no celular ou emulador

---

### 1️⃣ Configurar o Back-end

1. Abra o terminal e vá para a pasta do backend:

```bash
cd server
Instale as dependências:

bash
Copiar código
npm install
⚠️ Dica para Windows/VS Code:
Se aparecer erro "npm não é reconhecido", feche o VS Code, abra novamente ou execute Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser no PowerShell como administrador.

Criar o arquivo .env:

env
Copiar código
DATABASE_URL="postgresql://postgres:12345@localhost:5432/avaliatestudents?schema=public"
JWT_SECRET="sua_chave_secreta"
Substitua 12345 pela senha que você quer definir para o PostgreSQL.

2️⃣ Configurar o Banco de Dados
Opção 1: PostgreSQL local (sem Docker)

Abra o SQL Shell (psql) ou PgAdmin 4.

Crie/alterar usuário postgres:

sql
Copiar código
ALTER USER postgres PASSWORD '12345';
Crie o banco:

sql
Copiar código
CREATE DATABASE avaliatestudents;
Opção 2: Usando Docker

bash
Copiar código
docker run --name avalia-db -e POSTGRES_PASSWORD=12345 -p 5432:5432 -d postgres:14
3️⃣ Criar e aplicar tabelas (Prisma Migrate)
No terminal do backend:

bash
Copiar código
npx prisma migrate dev --name init
⚠️ Se npx não funcionar, use npm exec prisma migrate dev --name init

Isso vai criar todas as tabelas e gerar o Prisma Client.

4️⃣ Iniciar o servidor
bash
Copiar código
npm run dev
O servidor estará disponível em: http://localhost:3333

5️⃣ Configurar o Aplicativo Mobile
Vá para a pasta do app:

bash
Copiar código
cd app-mobile
Instale as dependências:

bash
Copiar código
npm install
Ajuste o IP do backend no arquivo app-mobile/constants/api.ts:

ts
Copiar código
export const IP_DO_BACKEND = "192.168.X.X"; // IP da sua máquina na rede local
Rode o aplicativo:

bash
Copiar código
npx expo start
Abra o Expo Go no celular e escaneie o QR code.

🛠️ Gerenciamento do Banco de Dados (Opcional)
Para visualizar ou editar dados diretamente:

Ferramenta recomendada: PgAdmin 4 ou DBeaver

Configurações:

Host: localhost

Porta: 5432

Database: avaliatestudents

Usuário/Senha: postgres/12345

📂 Estrutura do Banco
Tabela	Descrição
Usuario	Login, senha (criptografada), foto e papel no sistema
Moradia	Informações do imóvel, localização (GPS) e proprietário
Reserva	Datas, status e vínculo aluno → moradia
Avaliacao	Notas e comentários sobre moradias
Mensagem	Estrutura futura para chat interno

👨‍💻 Autor
Desenvolvido por José Fernandes, para a disciplina de Desenvolvimento Mobile/Web.

📚 Documentação Adicional

* 🗂️ **Diagrama de Casos de Uso:*![Diagrama de Casos de Uso](./app-mobile/docs/casos-de-uso.png)
* 🧩 **Diagrama de Classes:*![Diagrama de Classes](./app-mobile/docs/diagrama-de-classe.png)
* 📱 **Protótipo Navegável:** *[➡️ Visualizar Protótipo no Figma](https://www.figma.com/design/a7OVs61HbxlT3c3tP8GyXr/Sem-t%C3%ADtulo?node-id=2-170&t=GlEIy3610zuiOu88-1)*
