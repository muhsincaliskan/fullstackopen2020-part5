/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    // cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'muhsin',
      password: 'root'
    }
    cy.request('POST', 'http://localhost:3001/login/', user)
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function() {
    cy.contains('Blogs')
    cy.contains('Blog app, Department of Computer Science, University of Helsinki 2020')
  })

  it('Login form is shown', function() {
    cy.contains('Login').click()
    cy.contains('Username')
    cy.contains('Password')
  })
  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('Login').click()
      cy.get('input:first').type('muhsin')
      cy.get('input:last').type('root')
      cy.get('#login-button').click()
      cy.contains('muhsin logged in')
    })
    describe('When logged in', function() {
      beforeEach(function () {
        cy.contains('Login').click()
        cy.get('input:first').type('muhsin')
        cy.get('input:last').type('root')
        cy.get('#login-button').click()
        cy.contains('muhsin logged in')
      })
      it('a new blog can be created', function() {
        cy.contains('New Blog').click()
        cy.get('#title')
          .type('Muhsin React test')
        cy.get('#author')
          .type('muhsinc')
        cy.get('#url')
          .type('http//')
        cy.get('#create-button')
          .click()
        cy.contains('Muhsin React test muhsinc')
      })
      it('user who created a blog can delete it', function() {
        cy.contains('New Blog').click()
        cy.get('#title')
          .type('First class tests')
        cy.get('#author')
          .type('Edsger W. Dijkstra')
        cy.get('#url')
          .type('http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html')
        cy.get('#create-button')
          .click()
        cy.contains('First class tests Edsger W. Dijkstra')
          .click()
        cy.contains('View')
          .click()
        cy.get('#delete-button')
          .click()
        cy.get('html').should('not.contain', 'First class tests - Edsger W. Dijkstra')
      })
      it('like button test', function () {
        cy.contains('Muhsin React test')
        cy.contains('View')
          .click()
        cy.contains('Muhsin React test')
        cy.contains('Like')
          .click()
        cy.contains('1')
      })
    })
  })
})