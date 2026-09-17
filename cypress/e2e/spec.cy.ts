describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
    cy.get('#navbar a[href="/utilities"]').click();
    cy.get('#navbar a.dropdown-toggle').click();
    cy.get('#navbar a[href="/commands/actions"]').click();
    cy.get('#email1').click();
    cy.get('#email1').type('a@b');
    cy.get('#actions form div:nth-child(2)').click();
    cy.get('#password1').click();
  })
});

it('prueba', function() {});