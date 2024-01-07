

const ArticlesPage = {

   /**
   * The locator for the articles list
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
   articlesList: () => cy.xpath('//ul'),

  /**
   * Article from the list of articles
   * @param articleName - the name of the article
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
   articleFromList: (articleName) => cy.xpath(`//li//a[text()="${articleName}"]`),


}

export { ArticlesPage }