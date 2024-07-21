describe('Página de login', () => {

    beforeEach(() => {
      cy.visit('https://adopet-frontend-cypress.vercel.app');
      cy.get('[data-test="login-button"]').click();
      cy.intercept('POST', 'https://adopet-api-i8qu.onrender.com/adotante/login',{
        statusCode: 400
      }).as('stubPost');

    })

    it('CT 1 - Deve preencher os campos do login corretamente e autenticar o usuário na página', () => {

      cy.loginPersonalizado('ana@email.com', '123');
      cy.get('.error').should('have.text', 'A senha deve conter pelo menos uma letra maiúscula, um número e ter entre 6 e 15 caracteres');
    })

    it('CT 2 - Deve falhar mesmo que os campos sejam preenchidos corretamente', () => {
      cy.loginPersonalizado('ana@email.com', 'Senha123');
      cy.wait('@stubPost');
      cy.contains('Falha no login. Consulte suas credenciais').should('be.visible')
    })
})