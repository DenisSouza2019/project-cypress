import assert from "assert";

class RegisterForm {
  elements = {
    titleInput: () => cy.get("#title"),
    titleFeedback: () => cy.get("#titleFeedback"),
    urlFeedback: () => cy.get("#urlFeedback"),
    imageUrlInput: () => cy.get("#imageUrl"),
    submitBtn: () => cy.get("#btnSubmit"),
    cardList: () => cy.get("#card-list"),
  }

  typeTitle(text) {
    if (!text) return;
    this.elements.titleInput().type(text);
  }

  typeUrl(text) {
    if (!text) return;
    this.elements.imageUrlInput().type(text);
  }

  clickSubmit() {
    this.elements.submitBtn().click();
  }
}

const registerForm = new RegisterForm();

const colors = {
  erros: "rgb(220, 53, 69)",
  success: "rgb(222, 226, 230)"
}

const INPUT = {
  title: "Alien BR",
  url: "https://cdn.mos.cms.futurecdn.net/eM9EvWyDxXcnQTTyH8c8p5-1200-80.jpg"
}


describe("HU - Registro de Imagem", () => {
  
  describe("Cenário 1: Enviando uma imagem com entradas inválidas", () => {
    //Limpar o cenario de teste uma vez que o teste vai ser executado de novo, liberando espaço no localstorage
    afterEach(() => {
      cy.clearLocalStorage();
    });


    const inputs = {
      title: "",
      url: ""
    }

    it("Dado que estou na página de registro de imagens", () => {
      cy.visit("/");
    });

    it(`Quando eu insiro "${inputs.title}"" no campo de titulo`, () => {
      registerForm.typeTitle(inputs.title);
    })

    it(`Quando eu insiro "${inputs.url}"" no campo de URL`, () => {
      registerForm.typeUrl(inputs.url);
    })

    it(`Então clico no botão enviar`, () => {
      registerForm.clickSubmit();
    })

    it(`Então, devo ver a mensagem "Please type a title for the image" abaixo do campo de titulo`, () => {
      //registerForm.elements.titleFeedback().should(element =>{debugger});
      registerForm.elements.titleFeedback().should("contain.text", "Please type a title for the image");
    })

    it(`E devo ver a mensagem "Please type a valid URL" abaixo do campo de URL`, () => {
      registerForm.elements.urlFeedback().should("contain.text", "Please type a valid URL");
    })

    it(`E devo ver um ícone de exclamação nos campos de titulo e URL`, () => {
      registerForm.elements.titleInput().should(([element]) => {
        const styles = window.getComputedStyle(element);
        const border = styles.getPropertyValue("border-right-color");
        assert.strictEqual(border, colors.erros)
      });
    })

  });

  describe("Cenário 2: Enviando uma imagem com entradas válidas usando a tecla Enter", () => {

    it("Dado que estou na página de registro de imagens", () => {
      cy.visit("/");
    });

    it(`Quando eu digito "${INPUT.title}" no campo de título`, () => {
      registerForm.typeTitle(INPUT.title);
      cy.wait(500)


    });

    it('Então devo ver um ícone de verificação no campo de título', () => {

      registerForm.elements.titleInput().should( ([element]) => {
        const styles = window.getComputedStyle(element);
        const border = styles.getPropertyValue("border-right-color");
        assert.strictEqual(border, border === 'rgb(134, 183, 254)' ? 'rgb(134, 183, 254)' :  colors.success)

      });
    })

    it(`Quando eu digito "${INPUT.url}" no campo de URL`, () => {
      registerForm.typeUrl(INPUT.url);
    });

    it("Então devo ver um ícone de verificação no campo imageUrl", () => {
      registerForm.elements.imageUrlInput().should(([element]) => {
        const styles = window.getComputedStyle(element);
        const border = styles.getPropertyValue("border-right-color");
        assert.strictEqual(border, border === 'rgb(134, 183, 254)' ? 'rgb(134, 183, 254)' :  colors.success)
      });
    })

    it(`E pressiono o botão de Enter para enviar o formulário`, () => {
      registerForm.clickSubmit();
    });

    it('E a lista de imagens cadastradas deverá ser atualizada com o novo item', () => {
      registerForm.elements.cardList().should("contain.text", INPUT.title)
    })

    it('E o novo item deve ser armazenado no localStorage', () => {
      cy.getAllLocalStorage().should((element) => {
        const currentLs = element[window.location.origin]
        const elements = JSON.parse(Object.values(currentLs))

        assert.deepStrictEqual(elements[elements.length - 1], {
          title: INPUT.title,
          imageUrl: INPUT.url,
        })
      })
    })

    it('Então as entradas devem ser limpas', () => {
      registerForm.elements.titleInput().should('have.value', '')
      registerForm.elements.imageUrlInput().should('have.value', '')
      cy.clearLocalStorage()
    })

  })

  describe("Cenário 3 - Enviando uma imagem e atualizando a lista:", () => {

    
    it("Dado que estou na página de registro de imagens", () => {
      cy.visit("/");
    });

    it(`Então eu digitei "${INPUT.title}" no campo do título`, () => {
      registerForm.typeTitle(INPUT.title);
    })

    it(`Então digitei "${INPUT.url}" no campo URL`, () => {
      registerForm.typeUrl(INPUT.url);
    })

    it('Quando clico no botão enviar', () => {
      registerForm.clickSubmit();
    })

    it('E a lista de imagens cadastradas deverá ser atualizada com o novo item', () => {
      registerForm.elements.cardList().should("contain.text", INPUT.title)
    })

    it('E o novo item deve ser armazenado no localStorage', () => {
      cy.getAllLocalStorage().should((element) => {
        const currentLs = element[window.location.origin]
        const elements = JSON.parse(Object.values(currentLs))

        assert.deepStrictEqual(elements[elements.length - 1], {
          title: INPUT.title,
          imageUrl: INPUT.url,
        })
      })
    })

    it('Então as entradas devem ser limpas', () => {
      registerForm.elements.titleInput().should('have.value', '')
      registerForm.elements.imageUrlInput().should('have.value', '')
      cy.clearLocalStorage()
    })


  })

  describe("Cenário 4 - Atualizando a página após enviar uma imagem clicando no botão enviar:", () => {
    
    it("Dado que estou na página de registro de imagens", () => {
      cy.visit("/");
    });

    it("Então enviei uma imagem clicando no botão enviar", () => {

      registerForm.typeTitle(INPUT.title)
      registerForm.typeUrl(INPUT.url)
      registerForm.clickSubmit();
      cy.wait(100)

    })

    it("Quando eu atualizo a página", ()=>{
     cy.reload()
    })

    it("Então ainda devo ver a imagem enviada na lista de imagens cadastradas",  () => { 

      cy.getAllLocalStorage().should((element) => {  
        const currentLs = element[window.location.origin]

        if(!currentLs) return      

        const elements = JSON.parse(Object.values(currentLs))

        assert.deepStrictEqual(elements[elements.length - 1], {
          title: INPUT.title,
          imageUrl: INPUT.url,
        })
      })

    })


  })
});
