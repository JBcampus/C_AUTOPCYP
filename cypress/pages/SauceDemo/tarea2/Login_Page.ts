export class Login_Page {
    
    private readonly usernameInput = "username";
    private readonly passwordInput = "password";
    private readonly loginButton   = "login-button";

    /** Realizar acción de login 
     *  Para fines de practica del taller, se utiliza comando personalizado "getByDataTest".
    */
    iniciarSesion(username: string, password: string): void {
        cy.getByDataTest(this.usernameInput).clear().type(username).should("have.value", username);
        cy.getByDataTest(this.passwordInput).clear().type(password).should("have.value", password);
        cy.getByDataTest(this.loginButton).click();
    }

    abrirPaginaInventarioProductos(): void {
        cy.url().should("include", "/inventory.html");
        cy.get('[data-test="title"]').should("have.text","Products");
    }

}
