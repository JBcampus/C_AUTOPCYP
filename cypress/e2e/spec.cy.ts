describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  });

  it('prueba', function() {
    cy.visit('https://example.cypress.io')
    
    cy.get('div:nth-child(4) li:nth-child(1) ul li:nth-child(1) a').click();
    cy.get('#query-btn').click();
    cy.get('#querying div:nth-child(1) > div.col-xs-7 > pre > code.javascript').click();
    cy.get('#navbar a[href="/utilities"]').click();
    cy.get('ul.list-group li:nth-child(1)').click();
    cy.get('ul.list-group li:nth-child(1)').click();
    cy.get('ul.list-group li:nth-child(1)').click();
    cy.get('#navbar a.dropdown-toggle').click();
    cy.get('#navbar a[href="/commands/viewport"]').click();
  });
})