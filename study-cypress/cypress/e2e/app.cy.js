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
  success:"rgb(168, 210, 101)"
}

describe("Image Registration", () => {
  describe("Scenario-1: Submitting an image with invalid inputs", () => {
    //Limpar o cenario de teste uma vez que o teste vai ser executado de novo, liberando espaço no localstorage
    afterEach(() => {
      cy.clearLocalStorage();
    });


    const inputs = {
      title: "",
      url: ""
    }

    it("Given I am on the image registration page", () => {
      cy.visit("/");
    });

    it(`When I enter "${inputs.title}"" in the title field`, () => {
      registerForm.typeTitle(inputs.title);
    })

    it(`When I enter "${inputs.url}"" in the URL field`, () => {
      registerForm.typeUrl(inputs.url);
    })

    it(`Then I click the submit button`,() => {
      registerForm.clickSubmit();
    })

    it(`Then I should see "Please type a title for the image" message above the title field`,() => {
      //registerForm.elements.titleFeedback().should(element =>{debugger});
     registerForm.elements.titleFeedback().should("contain.text", "Please type a title for the image");
    })

    it(`And I should see "Please type a valid URL" message above the imageUrl field`,() => {
      registerForm.elements.urlFeedback().should("contain.text", "Please type a valid URL");
    })

    it(`And I should see an exclamation icon in the title and URL fields`,() => {
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
});
