describe('Api Adopet', () => {

    const API_URL = 'https://adopet-api-i8qu.onrender.com';
    const endpoint = '/mensagem';
    const ID_USER = '11643cd6-7112-415b-95d2-07904b0d1a1c';



    it('CT1 - Verificar Mensagens da API', () => {
        cy.request({
            method: 'GET',
            url: API_URL + endpoint + `/${ID_USER}`,
            headers: Cypress.env()
        }).then((response) => {
            expect(response.status).to.be.equal(200)
            expect(response.body).is.not.empty
            expect(response.body).to.have.property('msg')
        })
    })
})