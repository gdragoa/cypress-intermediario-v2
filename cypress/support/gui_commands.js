Cypress.on('uncaught:exception', (err, runnable) => {
  // Permite que a aplicação gere erros não capturados sem falhar o teste
  return false;
});

Cypress.Commands.add('login', (
  user = Cypress.env('user_name'),
  password = Cypress.env('user_password'),
  { cacheSession = true } = {},
) => {
  const login = () => {
    cy.visit('/users/sign_in')

    cy.get("[data-qa-selector='login_field']").type(user)
    cy.get("[data-qa-selector='password_field']").type(password, { log: false })
    cy.get("[data-qa-selector='sign_in_button']").click()
  }

  const validate = () => {
    cy.visit('/')
    cy.location('pathname', { timeout: 1000 })
      .should('not.eq', '/users/sign_in')
  }

  const options = {
    cacheAcrossSpecs: true,
    validate,
  }

  if (cacheSession) {
    cy.session(user, login, options)
  } else {
    login()
  }
})


Cypress.Commands.add('logout', () => {
  cy.get('.header-user-dropdown-toggle').click()
  cy.contains('Sign out').click()
})


Cypress.Commands.add('gui_createProject', project => {
  cy.visit('/projects/new')
  cy.get(".modal-header").should('exist').then(modal => {
    if (modal) {
      cy.get(".modal-header > .btn").click()
    }
  })

  cy.get('a[href="#blank_project"]').click()
  cy.get('#project_name').type(project.name)

  cy.get('.dropdown-toggle')
    .contains('Pick a group or namespace')
    .click()

  cy.get('#__BVID__26')
    .type('root')
    .wait(500)
    .then(() => {
      cy.get('.gl-dropdown-item-text-wrapper')
        .contains('root')
        .click();
    });

  cy.get('#project_initialize_with_readme').check()
  cy.contains('.gl-button', 'Create project').click()
})

Cypress.Commands.add('gui_createIssue', issue => {
  cy.visit(`/${Cypress.env('user_name')}/${issue.project.name}/issues/new`)

  cy.get(".modal-header").should('exist').then(modal => {
    if (modal) {
      cy.get(".modal-header > .btn").click()
    }
  })

  cy.get('#issue_title').type(issue.title)
  cy.get('#issue_description').type(issue.description)
  cy.contains('Create issue').click()
})

Cypress.Commands.add('gui_setLabelOnIssue', label => {
  cy.get('span[data-testid="title"]').contains('Labels')
  .parent()
  .find('span.gl-button-text')
  .contains('Edit')
  .click()
  .wait(900)
  cy.contains(label.name).click()
  cy.get('body').click()
})

Cypress.Commands.add('gui_setMilestoneOnIssue', milestone => {
  cy.get(".modal-header").should('exist').then(modal => {
    if (modal) {
        cy.get(".modal-header > .btn").click()
    }
})
  cy.get('[data-testid="milestone-edit"] > .gl-display-flex > [data-testid="edit-button"]').click()
  cy.wait(400)
  cy.contains(milestone.title).click()
})


