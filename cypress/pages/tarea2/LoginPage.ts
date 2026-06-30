export class LoginPage {
    private readonly url = "/";
    private readonly expectedUrl = "/inventory";

    visit(): void{
        cy.visit(this.url);
    }

    login(username: string, password: string){
        cy.loginByUi(username, password);
        cy.url().should('include', this.expectedUrl);
        cy.getByDataTest('title').should('be.visible');
        cy.getByDataTest('title').should('have.text', 'Products');
    }

}