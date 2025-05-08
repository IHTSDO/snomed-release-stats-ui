export default class StartPage {

    urlBrowserReleaseStats = Cypress.env('URL_BROWSER') + '/qa/';

    visit() {
        cy.visit(this.urlBrowserReleaseStats);
    }

    acceptCookies() {
        cy.get('#iubenda-cs-banner').find('.iubenda-cs-accept-btn').click();
    }

    acceptLicenseAgreement() {
        cy.get('#license-modal').find('#accept-license-button-modal').click();
    }

}
