
describe('welcome page', () => {
  it('should display welcome page', () => {
    // expect(5+3).to.equal(8);
    cy.fixture('posts.json').as('postsJSON');
    cy.server();
    cy.route('https://jsonplaceholder.typicode.com/posts/2','@postsJSON').as('posts');
    cy.visit('/');
    cy.contains('Activity');
    cy.wait('@posts',{timeout: 60000});
  });
});
