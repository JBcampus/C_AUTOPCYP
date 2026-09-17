describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  });

  it('test1', function() {});

  it('test2', function() {
    cy.visit('https://example.cypress.io')
    
    cy.get('div:nth-child(4) li:nth-child(1) ul li:nth-child(1) a').click();
    cy.get('#query-btn').click();
  });
})