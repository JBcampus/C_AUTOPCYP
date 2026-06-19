describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
    cy.get('#navbar a[href="/cypress-api"]').click();
    cy.get('#navbar a[href="/utilities"]').click();
  })
})