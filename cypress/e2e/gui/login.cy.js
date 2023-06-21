describe('Login', () => {
  it('successfully', () => {
    const user = Cypress.env('user_name')
    const password = Cypress.env('user_password')
    const options = { cacheSession: false }

    cy.login(user, password, options)

    cy.get(".modal-header").should('exist').then(modal => {
      if (modal) {
        cy.get(".modal-header > .btn").click()
      }
    })

    cy.get('.header-user-avatar').should('be.visible')
  })
})