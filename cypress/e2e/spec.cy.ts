describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
    cy.get('#navbar a.dropdown-toggle').click();
    cy.get('#navbar a[href="/commands/misc"]').click();
  })
})