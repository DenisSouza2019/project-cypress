describe('Api Adopet', () => {
    const authorization = 'Bearer ' + Cypress.env('token');
    //const authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTY0M2NkNi03MTEyLTQxNWItOTVkMi0wNzkwNGIwZDFhMWMiLCJhZG9wdGVyTmFtZSI6IkFuYSBkZSBKZXN1cyIsImlhdCI6MTcyMTU5MTUxMiwiZXhwIjoxNzIxODUwNzEyfQ.OTN9SzFaFuZ_ao_T9NSswSSv7CioQqWqBi50fhI9QAk`

    const API_URL = 'https://adopet-api-i8qu.onrender.com';
    const endpoint = '/mensagem';
    const ID_USER = '11643cd6-7112-415b-95d2-07904b0d1a1c';



    it('CT1 - Verificar Mensagens da API', () => {
        cy.request({
            method: 'GET',
            url: API_URL + endpoint + `/${ID_USER}`,
            headers: { authorization }
        }).then((response) => {
            expect(response.status).to.be.equal(200)
            expect(response.body).is.not.empty
            expect(response.body).to.have.property('msg')    
        })
    })
})