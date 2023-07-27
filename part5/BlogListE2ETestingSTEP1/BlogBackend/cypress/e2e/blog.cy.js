describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
  })
  
  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
    cy.contains('create new blog')
  })
  
})