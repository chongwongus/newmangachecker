// cypress/integration/checkLatestChapter.spec.js

const latestChapterFilePath = 'D:/workspace/cypress/e2e/newmangachecker/latestChapter.json';

describe('checks for latest chapter of Nine Peaks', () => {
  before(() => {
    // Load the latest checked chapter from the JSON file
    cy.readFile(latestChapterFilePath).then((data) => {
      cy.log(`Latest Checked Chapter: ${data.latestChapter}`);
    });
  });

  it('checks for updates', () => {
    // Visit the MangaDex homepage
    cy.visit('https://mangadex.org/')

    // Wait for the homepage to load by checking the URL
    cy.url().should('eq', 'https://mangadex.org/')

    // Wait for the search input to be visible before typing with an extended timeout
    cy.get('#header-search-input', { timeout: 10000 }).should('be.visible').type("Nine Peaks{enter}")

    // Wait for the search results to load
    cy.url().should('include', '/search')

    // Click on the first manga card with an extended timeout
    cy.get('.manga-card', { timeout: 10000 }).should('be.visible').first().click()

    // Read the latest chapter from the JSON file
    cy.readFile(latestChapterFilePath).then((data) => {
      const latestCheckedChapter = data.latestChapter;

      // Check for the latest chapter with an extended timeout
      cy.get('.chapter-grid', { timeout: 10000 }).should('be.visible').first().should('include.text', `Ch. ${latestCheckedChapter}`);
    });
  });  
  
  after(() => {
    // Update the latest checked chapter in the JSON file
    cy.get('.chapter-grid', { timeout: 10000 }).should('be.visible').first().invoke('text').then((chapterText) => {
      // Extract the chapter number from the text (assuming the format is "Ch. 123")
      const latestChapter = parseInt(chapterText.match(/Ch\. (\d+)/)[1], 10);

      // Update the JSON file
      cy.writeFile(latestChapterFilePath, { latestChapter });
      cy.log(`Updated Latest Checked Chapter: ${latestChapter}`);
    });
  });
});
