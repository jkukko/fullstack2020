describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'jompe',
      username: 'jompenaattori',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })


  describe('Login', function() {
    it('Login with uncorrect credentials --> login failed', function() {
      cy.contains('login').click()
      cy.get('#username').type('jompenaattori')
      cy.get('#password').type('salasana2')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'wrong credentials')
      cy.get('html').should('not.contain', 'jompe logged in')
    })

    it('Login with correct credentials --> login success', function() {
      cy.contains('login').click()
      cy.get('#username').type('jompenaattori')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('jompe logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'jompenaattori', password: 'salasana' })
    })

    it('Can create new blog', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('jompen blogi')
      cy.get('#author').type('jompe')
      cy.get('#url').type('www.jompenblogi.com')
      cy.get('#create-button').click()
      cy.get('.success').should('contain', 'Blog: jompen blogi, added succesfully')
      cy.contains('jompen blogi')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'first blog', author: 'author', url: 'first url', likes: 0 })
      })

      it('a blog can be likes', function() {
        cy.get('#view-button').click()
        cy.get('#like-button').click()
        cy.contains('Likes 1')
      })

      it('a blog can be removed', function() {
        cy.get('#view-button').click()
        cy.get('#remove-button').click()
        cy.get('.success').should('contain', 'blog first blog removed')
        cy.get('first blog').should('not.exist')
      })
    })

    describe('and several blogs exists', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'first blog', author: 'author', url: 'first url', likes: 0 })
        cy.createBlog({ title: 'second blog', author: 'author', url: 'second url', likes: 10 })
        cy.createBlog({ title: 'third blog', author: 'author', url: 'third url', likes: 20 })
      })

      it('blogs are in desc order based on likes', function() {
        cy.get('.blog').then(blogs => {
          cy.wrap(blogs[0]).should('contain', 'third blog')
          cy.wrap(blogs[1]).should('contain', 'second blog')
          cy.wrap(blogs[2]).should('contain', 'first blog')
        })
      })
    })
  })
})

