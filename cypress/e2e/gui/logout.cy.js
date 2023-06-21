describe('Logout', () => {
    beforeEach(() => {
      cy.login()
      cy.visit('/')

      cy.get(".modal-header").should('exist').then(modal => {
        if (modal) {
          cy.get(".modal-header > .btn").click()
        }
      })
    })
  
    it('successfully', () => {
      cy.logout()
  
      cy.url().should('be.equal', `${Cypress.config('baseUrl')}/users/sign_in`)
    })
  })