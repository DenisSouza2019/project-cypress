import {usuarios} from '../fixtures/usuarios.json';

describe('HU - Testes de cadastro de usuários, utilizando uma massa de dados', () => {
    beforeEach(() => {
        cy.visit('https://adopet-frontend-cypress.vercel.app');
        cy.get('[data-test="register-button"]').click();
    });

    usuarios.forEach((user) => {
        it(`CT1 - Cadastrando o novo usuário: ${user.name}`, () => {
            
            cy.cadastrar(user.name, user.email, user.password);

        });
    });
})