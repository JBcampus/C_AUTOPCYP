it("Test 1 - Debería iniciar sesión correctamente", () => {
    cy.visit("/");
    cy.get('#user-name').as("usernameInput");
    cy.get('#password').as("passwordInput");
    cy.get('#login-button').as("loginButton");

    cy.get("@usernameInput").type("standard_user");
    cy.get("@passwordInput").type("secret_sauce");
    cy.get("@loginButton").click();

    cy.url().should('include', '/inventory.html');
    cy.get(".title").should('be.visible');
    cy.get(".title").should('have.text', 'Products');
});

it("Test 2 - Debería no iniciar sesión con usuario bloqueado", () => {
    cy.visit("/");
    cy.get('#user-name').as("usernameInput");
    cy.get('#password').as("passwordInput");
    cy.get('#login-button').as("loginButton");

    cy.get("@usernameInput").type("locked_out_user");
    cy.get("@passwordInput").type("secret_sauce");
    cy.get("@loginButton").click();

    cy.get('h3[data-test="error"]').as("errorMessage");
    cy.get("@errorMessage").should('be.visible');
    cy.get("@errorMessage").should('contain.text', 'locked out');

    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
});