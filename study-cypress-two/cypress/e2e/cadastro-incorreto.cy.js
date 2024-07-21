describe('CT1', () => {
    it('Cenário: Preencher o formulario de cadastro incorretamente, verificar o erro', () => {
      cy.visit('https://adopet-frontend-cypress.vercel.app/');
      cy.get('[data-test="register-button"]').click();

      cy.get('[data-test="submit-button"]').click();
      cy.get('form > :nth-child(5)').should('have.text', 'É necessário informar um endereço de email');  
      cy.get('form > :nth-child(8)').should('have.text', 'Crie uma senha');  
      cy.get('form > :nth-child(11)').should('have.text', 'Repita a senha criada acima');  


    })
  })