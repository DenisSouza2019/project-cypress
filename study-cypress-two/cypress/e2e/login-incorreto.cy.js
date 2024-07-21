describe('Página de login', () => {

    beforeEach(() => {
      cy.visit('https://adopet-frontend-cypress.vercel.app/');
      cy.get('[data-test="login-button"]').click();

    })

    it('Deve preencher os campos do login corretamente e autenticar o usuário na página', () => {

      cy.loginPersonalizado('ana@email.com', '123');
      cy.get('.error').should('have.text', 'A senha deve conter pelo menos uma letra maiúscula, um número e ter entre 6 e 15 caracteres');
    })
})