
import { ArticlesPage } from '../support/pageObjects/articlesPage.js'
import { ArticleDetailsPage } from '../support/pageObjects/ArticleDetailsPage.js'
import { NewArticlePage } from '../support/pageObjects/newArticlePage.js';
import { faker } from '@faker-js/faker';
import 'cypress-network-idle'

describe('New Article Page tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('User creates a new article', () => {
    let listOfStauses = ['public','private']
    let newArticleData = {
      articleTitle: faker.lorem.lines(1),
      articleBody: faker.lorem.lines(1),
      articleStatus: listOfStauses[Math.floor(Math.random() * listOfStauses.length)]
    }
    ArticlesPage.newArticleButton().click()
    cy.log("CREATE THE NEW ARTICLE").then(() => {
      NewArticlePage.articleTitleInputField().type(newArticleData.articleTitle)
      NewArticlePage.articleBodyTextField().type(newArticleData.articleBody)
      NewArticlePage.statusSelectField().select(newArticleData.articleStatus)
      NewArticlePage.createArticleButton().click()
      cy.waitForNetworkIdle(Cypress.env('waitForNetworkIdle'))
    })
    cy.log("VERIFY ARTICLE IS SUCCESSFULLY CREATED").then(() => {
       ArticleDetailsPage.allArticlesButton().click()
       cy.waitForNetworkIdle(Cypress.env('waitForNetworkIdle'))
       ArticlesPage.articleFromList(newArticleData.articleTitle).click()
       cy.waitForNetworkIdle(Cypress.env('waitForNetworkIdle'))
       ArticleDetailsPage.articleTitle().should('have.text',newArticleData.articleTitle)
       ArticleDetailsPage.articleBody().should('have.text',newArticleData.articleBody)
       ArticleDetailsPage.statusOfArticleField().should('contain.text',newArticleData.articleStatus)
    })
  })
  it('Verify error occurs if user tries to create article without title', () => {
    ArticlesPage.newArticleButton().click()
    cy.log("VERIFY ERROR OCCURS IF TITLE IS EMPTY").then(() => {
      NewArticlePage.articleBodyTextField().type(faker.lorem.lines(1))
      NewArticlePage.createArticleButton().click()
      NewArticlePage.titleCantBeBlankError().should('be.visible')
    })
  })
  it('Verify error occurs if user tries to create without body', () => {
    ArticlesPage.newArticleButton().click()
    cy.log("VERIFY ERROR OCCURS IF BODY IS EMPTY").then(() => {
      NewArticlePage.articleTitleInputField().type(faker.lorem.lines(1))
      NewArticlePage.createArticleButton().click()
      NewArticlePage.bodyCantBeBlankError().should('be.visible')
    })
  })
  it('Verify error occurs body is too short, when creating new articles', () => {
    ArticlesPage.newArticleButton().click()
    cy.log("VERIFY ERROR OCCURS IF BODY IS EMPTY").then(() => {
      NewArticlePage.articleTitleInputField().type(faker.lorem.lines(1))
      NewArticlePage.articleBodyTextField().type(faker.string.alpha(9))
      NewArticlePage.createArticleButton().click()
      NewArticlePage.bodyTooShortError().should('be.visible')
    })
  })
})