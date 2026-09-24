export class LoginPage {
    
    private readonly url = "/login";
    private readonly selectors = {
        usernameInput: "username",
        passwordInput: "password",
        loginButton: "submit-login",
        errorMessage: ".alert-danger",
    } as const;

    /**Navegar a la pagina de login */
    visit(): void {
        cy.visit(this.url);
    }

    /** Obtener mensaje de error */
    getErrorMessage() {
        return cy.get(this.selectors.errorMessage);
    }

    /**Realizar acción de login */
    login(username: string, password: string): void {
        cy.getById(this.selectors.usernameInput).clear().type(username);
        cy.getById(this.selectors.passwordInput).clear().type(password);
        cy.getById(this.selectors.loginButton).click();
    }
}
