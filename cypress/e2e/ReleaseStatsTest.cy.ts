import editions = require('../fixtures/editions.json');
import StartPage from "../pages/StartPage";
import ReleaseStatsPage from "../pages/ReleaseStatsPage";

const startPage = new StartPage();
const releaseStatsPage = new ReleaseStatsPage();

beforeEach(() => {
    cy.clearCookies();
})

editions.forEach((value: string) => {

    describe(`Release Stats for ${value}`, () => {

        it(`Launch Release Stats at ${startPage.urlBrowserReleaseStats}`, () => {
            startPage.visit();
        })

        it(`Select ${value}`, () => {
            releaseStatsPage.selectEditionByName(value);
        })

        it(`Select and verify DESCRIPTIVE STATISTICS tab in the ` + value, () => {
            releaseStatsPage.selectTabByName('DESCRIPTIVE STATISTICS');
            cy.get('.primary-charts').first().should('be.visible');
            cy.get('.secondary-charts ').first().should('be.visible');
        })

        it(`Select and verify GENERAL RELEASE STATISTICS tab in the ` + value, () => {
            releaseStatsPage.selectTabByName('GENERAL RELEASE STATISTICS');
            cy.get('.general-release-statistics table').first().should('be.visible').within(() => {
                cy.get('thead > tr').children('th').should('have.length', 5);
                cy.get('tbody').children('tr').should('have.length.at.least', 1);
            });
        })

        it(`Select and verify NEW CONCEPTS tab in the ` + value, () => {
            releaseStatsPage.selectTabByName('NEW CONCEPTS');
            cy.get('.new-concepts table').first().should('be.visible').within(() => {
                cy.get('thead > tr').children('th').should('have.length', 5);
                cy.get('tbody').children('tr').should('have.length.at.least', 1);
            });
        })

        it(`Select and verify INACTIVATED CONCEPTS tab in the ` + value, () => {
            releaseStatsPage.selectTabByName('INACTIVATED CONCEPTS');
            cy.get('.inactivated-concepts table').first().should('be.visible').within(() => {
                cy.get('thead > tr').children('th').should('have.length', 3);
                cy.get('tbody').children('tr').should('have.length.at.least', 1);
            });
        })

        it(`Select and verify CHANGES TO CONCEPTS tab in the ` + value, () => {
            releaseStatsPage.selectTabByName('CHANGES TO CONCEPTS');
            cy.get('.concept-changes-counts table').first().should('be.visible').within(() => {
                cy.get('thead > tr').children('th').should('have.length', 5);
                cy.get('tbody').children('tr').should('have.length.at.least', 1);
            });
        })

        it(`Select and verify RELEASE SUMMARY tab in the ` + value, () => {
            releaseStatsPage.selectTabByName('RELEASE SUMMARY');
            cy.get('.release-summary table').first().should('be.visible').within(() => {
                cy.get('thead > tr').children('th').should('have.length', 34);
                cy.get('tbody').children('tr').should('have.length.at.least', 1);
            });
        })
    })
})
