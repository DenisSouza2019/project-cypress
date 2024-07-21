describe('CT1', () => {

  beforeEach(() => {
    cy.visit('https://adopet-frontend-cypress.vercel.app/');
    cy.get('[data-test="register-button"]').click();
  })

  it('Cenário: Realizar um cadastro no site com sucesso:', () => {
    cy.cadastrar('Ana', 'ana@email.com', 'Senha123');
  })
})


describe('CT2', () => {
  it('Cenário 2: Pets disponiveis:', () => {
    cy.visit('https://adopet-frontend-cypress.vercel.app/');
    cy.get('.button').click()     
    cy.get('.header__home').click()  
  })
})