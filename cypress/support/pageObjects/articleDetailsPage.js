import { NewArticlePage } from "./newArticlePage"


const ArticleDetailsPage = {

    ...NewArticlePage,

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
     statusOfArticleField: () => cy.xpath('//strong[text()="Status of article:"]/parent::*'),


     /**
    * The "Edit" button
    * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
    */
     editButton: () => cy.xpath('//a[text()="Edit"]'),



      /**
    * The "Delete" button
    * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
    */
     deleteButton: () => cy.xpath('//a[text()="Delete"]'),


     /**
    * The "Update Article" button
    * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
    */
     updateArticleButton: () => cy.xpath('//input[@value="Update Article"]'),


     commenterInputField: () => cy.get('#comment_commenter'),

     commentBodyInputField: () => cy.get('#comment_body'),

     createCommentButton: () => cy.xpath('//input[@name="commit"]'),

     commentStatusSelectButton: () => cy.xpath('//select[@name="comment[status]"]'),

     commenterField: (commenter) => cy.xpath(`//span[text()="${commenter}"]`),

     commentField: (comment) => cy.xpath(`//span[text()="${comment}"]`),

     deleteCommentButton: (commenter) => cy.xpath(`//span//span[text()="${commenter}"]/ancestor::*[@class="comment"]//a`)
     
 }
 
 export { ArticleDetailsPage }