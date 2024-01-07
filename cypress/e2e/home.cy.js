
import { ArticlesPage } from '../support/pageObjects/articlesPage.js'
import { ArticleDetailsPage } from '../support/pageObjects/ArticleDetailsPage.js'

describe('Article page tests', () => {
  it('Verify article details page opens without errors', () => {
    cy.visit('/')
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