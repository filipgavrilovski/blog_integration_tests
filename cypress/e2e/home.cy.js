
import { ArticlesPage } from '../support/pageObjects/articlesPage'
import { ArticleDetailsPage } from '../support/pageObjects/articleDetailsPage'
import { NewArticlePage } from '../support/pageObjects/newArticlePage';
import { faker } from '@faker-js/faker';

describe('Article page tests', () => {
  let listOfStauses = ['public','private']
  before(() => {
    cy.visit('/');
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
  })
  beforeEach(() =>{
    cy.visit('/')
  })
  it('Verify article details page opens without errors', () => {
    let articleTitle
    cy.log("GET THE TITLE OF SOME ARTICLE FROM THE LIST").then(() => {
      ArticlesPage.articlesList().find('li').find('a').first().invoke('text').then((titleOfFirstArticle) => {
        articleTitle = titleOfFirstArticle
      })
    })
    cy.log("CLICK ON THE ARTICLE FROM THE LIST").then(() => {
      ArticlesPage.articleFromList(articleTitle).click()
    })
    cy.log("VERIFY THE ARTICLE DETAILS PAGE IS SUCCESSFULLY OPENED, FOR THE CORRECT ARTICLE").then(() => {
      ArticleDetailsPage.articleTitle().should('have.text',articleTitle)
    })
  })
})