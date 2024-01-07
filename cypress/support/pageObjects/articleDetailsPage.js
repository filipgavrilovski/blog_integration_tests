

const ArticleDetailsPage = {

    /**
    * The locator for the article title
    * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
    */
    articleTitle: () => cy.xpath('//div[@class="card-body"]//h1'),
 

 }
 
 export { ArticleDetailsPage }