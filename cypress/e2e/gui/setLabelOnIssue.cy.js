import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('Set label on issue', options, () => {
    const issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(3),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
    }

    const label = {
        name: `label-${faker.random.word()}`,
        color: '#ffaabb'
    }

    beforeEach(() => {
        cy.api_deleteProjects()
        cy.login()
        cy.api_createIssue(issue)
            .then(response => {
                cy.api_createLabel(response.body.project_id, label)
                cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`)
                cy.get(".modal-header").should('exist').then(modal => {
                    if (modal) {
                        cy.get(".modal-header > .btn").click()
                    }
                })
            })
    })

    it('successfully', () => {
        cy.gui_setLabelOnIssue(label)

        cy.get('.gl-label-text').should('contain', label.name)
        cy.get('div[data-testid="sidebar-labels"]')
            .find('.gl-label')
            .eq(0)
            .should('have.attr', 'style', `--label-background-color:${label.color}; --label-inset-border:inset 0 0 0 2px ${label.color};`)
        })
})
