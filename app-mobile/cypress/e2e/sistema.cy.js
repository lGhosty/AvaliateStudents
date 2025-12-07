describe('Testes de Sistema - AvaliateStudents', () => {
  
  beforeEach(() => {
    // Acessa o app Web
    cy.visit('http://localhost:8081');
  });

  it('Fluxo Completo: Cadastro -> Login -> Ver Moradias -> Perfil -> Logout', () => {
    
    // --- CADASTRO ---
    // Clica para ir para a tela de cadastro
    cy.contains('Cadastre-se').click();
    
    // Gera um email aleatório para não dar erro de "email já existe"
    const randomId = Math.floor(Math.random() * 100000);
    const emailTeste = `teste${randomId}@cypress.com`;
 
    cy.get('input[placeholder="Nome Completo"]', { timeout: 10000 })
      .should('be.visible')
      .last() // Pega o último (da tela de cadastro)
      .type('Usuário Cypress');

    cy.get('input[placeholder="E-mail"]').last().type(emailTeste); 
    cy.get('input[placeholder="Senha (mínimo 6)"]').last().type('123456');
    
    // Clica em cadastrar
    cy.contains('Cadastrar').click();
    
    // Verifica se voltou para a tela de Login
    cy.contains('Entrar').should('be.visible');

    // --- LOGIN ---
    // Agora estamos no login. Usamos .last() para garantir.
    cy.get('input[placeholder="E-mail"]').last().type(emailTeste);
    cy.get('input[placeholder="Senha"]').last().type('123456');
    
    cy.contains('Entrar').click();
    
    // --- HOME ---
    // Espera até 10 segundos para o login acontecer e a Home carregar
    cy.contains('Encontre seu Lar', { timeout: 10000 }).should('be.visible');
    
    // Verifica se carregou alguma moradia (procurando o símbolo R$)
    cy.contains('R$').should('be.visible');

    // --- PERFIL ---
    cy.contains('Perfil').click();
    
    // Verifica se o nome e o email aparecem no perfil
    cy.contains('Usuário Cypress').should('be.visible');
    cy.contains(emailTeste).should('be.visible');
    
    // --- LOGOUT ---
    cy.contains('Sair (Logout)').click();
    
    // Verifica se voltou para a tela inicial
    cy.contains('AvaliateStudents').should('be.visible');
  });
});