describe('CT1', () => {
  it('Cenário: Realizar um cadastro no site com sucesso:', () => {
    cy.visit('https://adopet-frontend-cypress.vercel.app/');
    cy.get('[data-test="register-button"]').click();
    cy.get('[data-test="input-name"]').type('Alien BR');
    cy.get('[data-test="input-email"]').type('ana@email.com');
    cy.get('[data-test="input-password"]').type('Senha123');
    cy.get('[data-test="input-confirm-password"]').type('Senha123');
    cy.get('[data-test="submit-button"]').click();  
  })
})


describe('CT2', () => {
  it('Cenário 2: Pets disponiveis:', () => {
    cy.visit('https://adopet-frontend-cypress.vercel.app/');
    cy.get('.button').click()     
    cy.get('.header__home').click()  
  })
})