

const NewArticlePage = {

    /**
    * The "Title" input field for the new article
    * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
    */
    articleTitleInputField: () => cy.xpath('//input[@name="article[title]"]'),
 

    /**
    * The "Body" text field for the new article
    * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
    */
    articleBodyTextField: () => cy.xpath('//textarea[@name="article[body]"]'),
  

    /**
    * The "Status" select button, to selecct the status of the new article
    * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
    */
    statusSelectField: () => cy.xpath('//select[@name="article[status]"]'),


    /**
    * The "Create Article" button
    * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
    */
    createArticleButton: () => cy.xpath('//input[@name="commit"]'),


    /**
    * The "Title can't be blank" error, that occurs when the title is blank, when creating new article
    * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
    */
    titleCantBeBlankError: () => cy.xpath(`//div[@class="field_with_errors"]/parent::*//div[text()="Title can't be blank"]`),



    /**
    * The "Body can't be blank" error, that occurs when the body is blank, when creating new article
    * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
    */
    bodyCantBeBlankError: () => cy.xpath(`//div[@class="field_with_errors"]/parent::*//div[text()="Body can't be blank"]`),


    /**
    * The "Body is too short (minimum is 10 characters)" error, that occurs when the body is too short, when creating new article
    * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
    */
     bodyTooShortError: () => cy.xpath(`//div[@class="field_with_errors"]/parent::*//div[text()="Body is too short (minimum is 10 characters)"]`),
 
 }
 
 export { NewArticlePage }