import { faker } from '@faker-js/faker';
import { ArticlesPage } from '../support/pageObjects/articlesPage';
import { ArticleDetailsPage } from '../support/pageObjects/articleDetailsPage';
import { NewArticlePage } from '../support/pageObjects/newArticlePage';

import 'cypress-network-idle';

describe('Comments tests', () => {
  const listOfStauses = ['public', 'private'];
  before(() => {
    let listOfStauses = ['public','private']
    let newArticleData = {
      articleTitle: faker.lorem.lines(1),
      articleBody: faker.lorem.lines(1),
      articleStatus: listOfStauses[Math.floor(Math.random() * listOfStauses.length)]
    }
    cy.visit('/');
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
