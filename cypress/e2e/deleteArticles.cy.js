import { ArticlesPage } from '../support/pageObjects/articlesPage.js';
import { ArticleDetailsPage } from '../support/pageObjects/ArticleDetailsPage.js';
import 'cypress-network-idle';

describe('New Article Page tests', () => {
  let articleTitle;
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
