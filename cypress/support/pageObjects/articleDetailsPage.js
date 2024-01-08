

const ArticleDetailsPage = {

    /**
    * The text field for the article title
    * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
    */
    articleTitle: () => cy.xpath('//div[@class="card-body"]//h1'),


    /**
    * The text field for the article body
    * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
    */
    articleBody: () => cy.xpath('//div[@class="card-body"]//p[@name="article-body"]'),


    /**
    * The "All Articles Page" button
    * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
    */
     allArticlesButton: () => cy.xpath('//a[text()="All Articles Page"]'),

    /**
    * The "Status of article" field, that shows the status of the article
    * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
    */
     statusOfArticleField: () => cy.xpath('//strong[text()="Status of article:"]/parent::*')
 

 }
 
 export { ArticleDetailsPage }