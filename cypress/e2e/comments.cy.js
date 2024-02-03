import { faker } from '@faker-js/faker';
import { ArticlesPage } from '../support/pageObjects/articlesPage.js';
import { ArticleDetailsPage } from '../support/pageObjects/ArticleDetailsPage.js';
import 'cypress-network-idle';

describe('Comments tests', () => {
  const listOfStauses = ['public', 'private'];
  beforeEach(() => {
    cy.visit('/');
  });
  it('User adds a new comment to article', () => {
    const commentData = {
      commenter: faker.person.fullName(),
      commentBody: faker.lorem.lines(1),
      commentStatus: listOfStauses[Math.floor(Math.random() * listOfStauses.length)],
    };
    cy.log('CLICK ON THE FIRST ARTICLE FROM THE LIST').then(() => {
      ArticlesPage.articlesList().find('li').find('a').first()
        .invoke('text')
        .then((titleOfFirstArticle) => {
          ArticlesPage.articleFromList(titleOfFirstArticle).click();
        });
    });
    ArticleDetailsPage.commenterInputField().type(commentData.commenter);
    ArticleDetailsPage.commentBodyInputField().type(commentData.commentBody);
    ArticleDetailsPage.commentStatusSelectButton().type(commentData.commentStatus);
    ArticleDetailsPage.createCommentButton().click();
    cy.waitForNetworkIdle(Cypress.env('waitForNetworkIdle'));
    ArticleDetailsPage.commenterField(commentData.commenter).should('be.visible');
    ArticleDetailsPage.commenterField(commentData.commenter).should('be.visible');
    ArticleDetailsPage.commenterField(commentData.commentBody).should('be.visible');
  });
  it('User deletes existing comment from article', () => {
    const commentData = {
      commenter: faker.person.fullName(),
      commentBody: faker.lorem.lines(1),
      commentStatus: listOfStauses[Math.floor(Math.random() * listOfStauses.length)],
    };
    cy.log('CLICK ON THE FIRST ARTICLE FROM THE LIST').then(() => {
      ArticlesPage.articlesList().find('li').find('a').first()
        .invoke('text')
        .then((titleOfFirstArticle) => {
          ArticlesPage.articleFromList(titleOfFirstArticle).click();
        });
    });
    ArticleDetailsPage.commenterInputField().type(commentData.commenter);
    ArticleDetailsPage.commentBodyInputField().type(commentData.commentBody);
    ArticleDetailsPage.commentStatusSelectButton().type(commentData.commentStatus);
    ArticleDetailsPage.createCommentButton().click();
    cy.waitForNetworkIdle(Cypress.env('waitForNetworkIdle'));
    ArticleDetailsPage.commenterField(commentData.commenter).should('be.visible');
    ArticleDetailsPage.deleteCommentButton(commentData.commenter).click();
    cy.waitForNetworkIdle(Cypress.env('waitForNetworkIdle'));
    ArticleDetailsPage.commenterField(commentData.commenter).should('not.exist');
    ArticleDetailsPage.commenterField(commentData.commentBody).should('not.exist');
  });
});
