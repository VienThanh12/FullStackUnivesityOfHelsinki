describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    
    const user_1 = {
      name: 'Kevin',
      username: 'Kevin',
      password: 'haducthanhvien'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user_1) 

    const user_2 = {
      name: 'Kayde',
      username: 'Kayde',
      password: 'haducthanhvien'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user_2) 

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
  
  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('Kevin')
      cy.get('#password').type('haducthanhvien')
      cy.get('#login-button').click()

      cy.contains('create new blog').click()
      cy.get('#title').type('a blog created by cypresss')
      cy.get('#author').type('Kevin')
      cy.get('#url').type('http://localhost:3000/__/#/specs/runner?file=cypress/e2e/blog.cy.js')

      cy.get('#create-button').click()

    })
    
    it('A blog can be created', function() {
      cy.contains('a blog created by cypress')
    })
    
    it('like button works', function() {
      cy.get('#view-button').click()
      cy.get('#like-button').click()
      cy.contains(1)
      cy.get('#like-button').click()
      cy.contains(2)
      cy.get('#like-button').click()
      cy.contains(3)
    })
    it('the user who created a blog can delete it.', function() {
      cy.contains('a blog created by cypress')
      cy.get('#view-button').click()
      cy.get('#delete-button').click()
      cy.contains('Deleting was successful')
    })
    
    it('the user who created can see delete button', function() {
      cy.get('#logout-button').click()
      cy.get('#username').type('Kayde')
      cy.get('#password').type('haducthanhvien')
      cy.get('#login-button').click()

      cy.get('#view-button').click()
      cy.get('#delete-button').click()
      cy.contains('Deleting was unsuccessful because of invalid user or expired token.')
    })
    
    it(' the blogs are ordered according to likes with the blog with the most likes being first.', function(){

    })
  })

})
