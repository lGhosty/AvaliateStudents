describe('Fluxo de Reserva', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8081');
  });

  it('Deve conseguir clicar em uma casa e ver o botão de reservar', () => {
    // 1. LOGIN (Necessário para reservar)
    cy.contains('Entrar').click();
    cy.get('input[placeholder="E-mail"]').last().type('teste28967@cypress.com'); 
    cy.get('input[placeholder="Senha"]').last().type('123456');
    cy.contains('Entrar').click();
    
    // Espera carregar a home (procura pelo preço)
    cy.contains('R$', { timeout: 10000 }).should('be.visible');

    // 2. CLICA NA CASA
    // Clica no primeiro preço que encontrar
    cy.contains('R$').first().click();

    // 3. VERIFICA SE ENTROU NOS DETALHES
    // vamos procurar pelo botão principal da ação: RESERVAR.
    // Damos 10 segundos para garantir que a API respondeu e a tela montou.
    cy.contains('Reservar', { timeout: 10000 }).should('be.visible');
    
    // (Opcional) Verifica se aparece alguma descrição ou endereço, se quiser ser específico
    // cy.contains('Endereço').should('be.visible');
  });
});