describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    
    const user = {
      name: 'Kevin',
      username: 'Kevin',
      password: 'haducthanhvien'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 

    cy.visit('http://localhost:3000')
  })
  
  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
    cy.contains('create new blog')
  })
  
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('Kevin')
      cy.get('#password').type('haducthanhvien')
      cy.get('#login-button').click()
      cy.contains('Kevin logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Kevin')
      cy.get('#password').type('h')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    })
  })
})