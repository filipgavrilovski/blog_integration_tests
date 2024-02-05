
import { ArticlesPage } from '../support/pageObjects/articlesPage'
import { ArticleDetailsPage } from '../support/pageObjects/articleDetailsPage'
import { NewArticlePage } from '../support/pageObjects/newArticlePage';
import { faker } from '@faker-js/faker';
import 'cypress-network-idle'

describe('Edit Article Page tests', () => {
  let articleTitle
  let listOfStauses = ['public','private']
  beforeEach(() => {
    cy.visit('/')
    cy.log("GET THE TITLE OF THE FIRST ARTICLE FROM THE LIST").then(() => {
        ArticlesPage.articlesList().find('li').find('a').first().invoke('text').then((titleOfFirstArticle) => {
          articleTitle = titleOfFirstArticle
        })
      })
      cy.log("CLICK ON THE ARTICLE FROM THE LIST (THE ARTICLE THAT WILL BE EDITED)").then(() => {
        ArticlesPage.articleFromList(articleTitle).click()
      })
  })
   it('User edits article',() => {
    let articleDataForEdit = {
        articleTitle: faker.lorem.lines(1),
        articleBody: faker.lorem.lines(1),
        articleStatus: listOfStauses[Math.floor(Math.random() * listOfStauses.length)]
      }
    cy.log("EDIT THE ARTICLE").then(() => {
        ArticleDetailsPage.editButton().click()
        ArticleDetailsPage.articleTitleInputField().clear({force:true}).type(articleDataForEdit.articleTitle)
        ArticleDetailsPage.articleBodyTextField().clear({force:true}).type(articleDataForEdit.articleBody)
        ArticleDetailsPage.statusSelectField().select(articleDataForEdit.articleStatus)
        ArticleDetailsPage.updateArticleButton().click()
        cy.waitForNetworkIdle(Cypress.env('waitForNetworkIdle'))
    })
    cy.log("VERIFY THE ARTICLE IS SUCCESSFULLY EDITED").then(() => {
        ArticleDetailsPage.allArticlesButton().click()
        cy.waitForNetworkIdle(Cypress.env('waitForNetworkIdle'))
        ArticlesPage.articleFromList(articleDataForEdit.articleTitle).click()
        cy.waitForNetworkIdle(Cypress.env('waitForNetworkIdle'))
        ArticleDetailsPage.articleTitle().should('have.text',articleDataForEdit.articleTitle)
        ArticleDetailsPage.articleBody().should('have.text',articleDataForEdit.articleBody)
        ArticleDetailsPage.statusOfArticleField().should('contain.text',articleDataForEdit.articleStatus)
    })
   })
   it('Verify error occurs if user tries to edit article with empty title',() => {
      let articleBody = faker.lorem.lines(1)
      cy.log("EDIT THE ARTICLE").then(() => {
          ArticleDetailsPage.editButton().click()
          ArticleDetailsPage.articleTitleInputField().clear({force:true})
          ArticleDetailsPage.articleBodyTextField().clear({force:true}).type(articleBody)
          ArticleDetailsPage.statusSelectField().select(listOfStauses[Math.floor(Math.random() * listOfStauses.length)])
          ArticleDetailsPage.updateArticleButton().click()
          NewArticlePage.titleCantBeBlankError().should('be.visible')
      })
   })
   it('Verify error occurs if user tries to edit article with empty body',() => {
    let articleTitle = faker.lorem.lines(1)
    cy.log("EDIT THE ARTICLE").then(() => {
        ArticleDetailsPage.editButton().click()
        ArticleDetailsPage.articleTitleInputField().clear({force:true}).type(articleTitle)
        ArticleDetailsPage.articleBodyTextField().clear({force:true})
        ArticleDetailsPage.statusSelectField().select(listOfStauses[Math.floor(Math.random() * listOfStauses.length)])
        ArticleDetailsPage.updateArticleButton().click()
        NewArticlePage.bodyCantBeBlankError().should('be.visible')
    })
  
 })
 it('Verify error occurs if user tries to edit article with body that is too short',() => {
    let articleTitle = faker.lorem.lines(1)
    let articleBody = faker.string.alpha(9)
    cy.log("EDIT THE ARTICLE").then(() => {
        ArticleDetailsPage.editButton().click()
        ArticleDetailsPage.articleTitleInputField().clear({force:true}).type(articleTitle)
        ArticleDetailsPage.articleBodyTextField().clear({force:true}).type(articleBody)
        ArticleDetailsPage.statusSelectField().select(listOfStauses[Math.floor(Math.random() * listOfStauses.length)])
        ArticleDetailsPage.updateArticleButton().click()
        NewArticlePage.bodyTooShortError().should('be.visible')
    })
 })
})