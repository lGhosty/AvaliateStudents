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
Criar o arquivo .env:Crie o arquivo na pasta server com o seguinte conteúdo:DATABASE_URL="postgresql://postgres:docker@localhost:5432/avaliatestudents?schema=public"
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
📱 Abra o Expo Go e escaneie o QR code.🛠️ Gerenciamento do Banco de Dados (Opcional)Para visualizar e editar os dados diretamente nas tabelas (como Usuario, Moradia, etc.), use um cliente gráfico:ConfiguraçãoValorFerramenta RecomendadaDBeaver Community EditionHostlocalhostPorta5432DatabaseavaliatestudentsUsuário/Senhapostgres/docker📂 Estrutura do BancoTabelaDescriçãoUsuarioLogin, senha (criptografada), foto e papel no sistema.MoradiaInformações do imóvel, localização (GPS) e proprietário.ReservaDatas, status e vínculo aluno → moradia.AvaliacaoNotas e comentários sobre moradias.MensagemEstrutura futura para chat interno.👨‍💻 AutorDesenvolvido por José Fernandes, para a disciplina de Desenvolvimento Mobile/Web.📚 Documentação Adicional🗂️ Diagrama de Casos de Uso:🧩 Diagrama de Classes:📱 Protótipo Navegável: ➡️ Visualizar Protótipo no Figma
