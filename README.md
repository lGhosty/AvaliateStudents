# AvaliateStudents 🏡

## 1. Descrição do Projeto

AvaliateStudents é um aplicativo móvel, desenvolvido para a disciplina de Programação para Dispositivos Móveis, que visa criar uma plataforma para estudantes encontrarem, visualizarem e avaliarem moradias universitárias. O projeto facilita a busca por um novo lar, trazendo mais transparência e segurança para a comunidade estudantil.

## 2. Funcionalidades Planejadas (Entrega 2)

O foco da segunda entrega é transformar o aplicativo estático em uma plataforma dinâmica, conectada a um back-end.

- [x] **Autenticação de Usuários:**
  - [ ] Cadastro de novos estudantes (usuários).
  - [ ] Login com validação de e-mail e senha.
  - [ ] Logout (sair da conta).
- [x] **Gerenciamento de Moradias:**
  - [ ] Listar todas as moradias cadastradas a partir da API.
  - [ ] Visualizar detalhes de uma moradia específica.
  - [ ] (NOVO) Cadastrar uma nova moradia.
- [x] **Funcionalidades do Usuário:**
  - [ ] (NOVO) Visualizar e editar o perfil do usuário.
  - [ ] (NOVO) Avaliar uma moradia.
  - [ ] (NOVO) Utilizar a câmera do celular para adicionar uma foto de perfil.

## 3. Tecnologias Utilizadas

- **App (Frontend):** React Native com Expo
- **Linguagem:** TypeScript
- **Navegação:** Expo Router
- **Estilização:** StyleSheet nativo (Flexbox)
- **Back-end:** (Definir - ex: Node.js com Express)
- **Banco de Dados:** PostgreSQL
- **Prototipação:** Figma

---
## 4. Documentação de Apoio

- **Diagrama de Casos de Uso (Atualizado):** `docs/casos-de-uso-v2.png`
- **Diagrama de Classes:** `docs/diagrama-de-classes.png`
- **Protótipo Navegável:** [➡️ Visualizar Protótipo no Figma](https://www.figma.com/design/a7OVs61HbxlT3c3tP8GyXr/Sem-t%C3%ADtulo?node-id=2-170&t=GlEIy3610zuiOu88-1)

---
## 5. Endpoints da API (Exemplo)

- `POST /usuarios`: Cria um novo usuário.
- `POST /login`: Autentica um usuário.
- `GET /moradias`: Retorna a lista de todas as moradias.
- `GET /moradias/:id`: Retorna os detalhes de uma moradia específica.
