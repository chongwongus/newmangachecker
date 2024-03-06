describe('checks for newest', () => {
  it('passes', () => {
    cy.visit('https://mangadex.org/')
    cy.wait(10000)
    cy.get('#header-search-input').type("Nine Peaks{enter}")
    cy.wait(10000)
    cy.get('.manga-card').click()
    cy.wait(10000)
    cy.get(':nth-child(1) > .flex-col > :nth-child(1) > :nth-child(1) > .chapter > .chapter-grid').contains("Ch. 84")
  })
})