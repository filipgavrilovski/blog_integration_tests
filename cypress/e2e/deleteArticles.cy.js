import { ArticlesPage } from '../support/pageObjects/articlesPage';
import { ArticleDetailsPage } from '../support/pageObjects/articleDetailsPage';
import { NewArticlePage } from '../support/pageObjects/newArticlePage';
import { faker } from '@faker-js/faker';

import 'cypress-network-idle';

describe('Delete Articles tests', () => {
  let articleTitle;
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
  beforeEach(() => {
    cy.visit('/');
  });
  it('User deletes article', () => {
    cy.log('GET THE TITLE OF THE FIRST ARTICLE FROM THE LIST').then(() => {
      ArticlesPage.articlesList().find('li').find('a').first()
        .invoke('text')
        .then((titleOfFirstArticle) => {
          articleTitle = titleOfFirstArticle;
        });
    });
    cy.log('CLICK ON THE ARTICLE FROM THE LIST (THE ARTICLE THAT WILL BE EDITED)').then(() => {
      ArticlesPage.articleFromList(articleTitle).click();
    });
    cy.log('DELETE ARTICLE').then(() => {
      ArticleDetailsPage.deleteButton().click();
      cy.waitForNetworkIdle(Cypress.env('waitForNetworkIdle'));
    });
    cy.log('VERIFY THE ARTICLE IS SUCCESSFULLY DELETED').then(() => {
      ArticlesPage.articleFromList(articleTitle).should('not.exist');
    });
  });
});
