import assert  from "assert";

class RegisterForm {
  elements = {
    titleInput: () => cy.get("#title"),
    titleFeedback: () => cy.get("#titleFeedback"),
    urlFeedback: () => cy.get("#urlFeedback"),
    imageUrlInput: () => cy.get("#imageUrl"),
    submitBtn: () => cy.get("#btnSubmit")
  }

  typeTitle(text) {
    if(!text) return;
    this.elements.titleInput().type(text);
  }

  typeUrl(text) {
    if(!text) return;
    this.elements.imageUrlInput().type(text);
  }

  clickSubmit() {
    this.elements.submitBtn().click();
  }
}

const registerForm = new RegisterForm();

const colors ={
  erros:"rgb(220, 53, 69)",
  success:"rgb(222, 226, 230)"
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

    it(`Então clico no botão enviar`,() => {
      registerForm.clickSubmit();
    })

    it(`Então, devo ver a mensagem "Please type a title for the image" abaixo do campo de titulo`,() => {
      //registerForm.elements.titleFeedback().should(element =>{debugger});
     registerForm.elements.titleFeedback().should("contain.text", "Please type a title for the image");
    })

    it(`E devo ver a mensagem "Please type a valid URL" abaixo do campo de URL`,() => {
      registerForm.elements.urlFeedback().should("contain.text", "Please type a valid URL");
    })

    it(`E devo ver um ícone de exclamação nos campos de titulo e URL`,() => {
      registerForm.elements.titleInput().should(([element]) =>{
        const styles = window.getComputedStyle(element);
        const border = styles.getPropertyValue("border-right-color");
        assert.strictEqual(border, colors.erros)
        //debugger
      });
    })



    //it(`    When I enter "" in the title field`, () => {
      // cy.get("input[name=title]").type(inputs.title);
      // cy.get("input[name=url]").type(inputs.url);
      // cy.get("button[type=submit]").click();
    //});

    

    
  });

  describe("Cenário 2: Enviando uma imagem com entradas válidas usando a tecla Enter", ()=>{
    
    afterEach(() => {
      cy.clearLocalStorage();
    });

    const inputs = {
      title: "Alien BR",
      url: "https://cdn.mos.cms.futurecdn.net/eM9EvWyDxXcnQTTyH8c8p5-1200-80.jpg"
    }

    it("Dado que estou na página de registro de imagens", () => {
      cy.visit("/");
    });

    it(`Quando eu digito "${inputs.title}" no campo de título`, () => {
      registerForm.typeTitle(inputs.title);
    });

    it('Então devo ver um ícone de verificação no campo de título',() => {
      registerForm.elements.titleInput().should(([element]) =>{
        
        const styles = window.getComputedStyle(element);
        const border = styles.getPropertyValue("border-right-color");
        assert.strictEqual(border, colors.success)
        //debugger
      });
    })

    // it(`Quando eu digito "${inputs.url}" no campo de URL`, () => {
      // registerForm.typeUrl(inputs.url);
    // });

    // it(`E pressiono o botão de Enter para enviar o formulário`, () => {
      // registerForm.clickSubmit();
    // });
  })
});
