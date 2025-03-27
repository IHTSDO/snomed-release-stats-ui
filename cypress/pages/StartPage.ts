export class StartPage {

    urlBrowser = Cypress.env('URL_BROWSER');

    visit() {
        cy.visit(this.urlBrowser);
    }

    acceptCookies() {
        cy.get('#iubenda-cs-banner').find('.iubenda-cs-accept-btn').click();
    }

    acceptLicenseAgreement() {
        cy.get('#license-modal').find('#accept-license-button-modal').click();
    }

    visitQaStatPage() {
        cy.visit(this.urlBrowser + '/qa/');
    }

}
