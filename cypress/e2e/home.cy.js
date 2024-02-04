
import { ArticlesPage } from '../support/pageObjects/articlesPage'
import { ArticleDetailsPage } from '../support/pageObjects/ArticleDetailsPage'

describe('Article page tests', () => {
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