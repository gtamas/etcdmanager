// https://docs.cypress.io/api/introduction/api.html

Cypress.Commands.add("visitIndex", function(options) {
    if (options == null) {
      options = {};
    }
    return cy.visit("http://localhost:8081/index.html", options);
  });

describe('My First Test', () => {
    beforeEach(function() {
        return cy.visitIndex().then(function(win) {

          var start, _ref;
          _ref = win.App, start = _ref.start, this.ipc = _ref.ipc;
          this.version = "1.0.0";
          cy.stub(this.ipc, "getOptions").resolves({
            version: this.version
          });
          cy.stub(this.ipc, "getElectronPath").resolves('');
          cy.stub(this.ipc, "getProjects").resolves([]);
          cy.stub(this.ipc, "require").resolves([]);
          cy.stub(this.ipc, "getProjectStatuses").resolves([]);
          cy.stub(this.ipc, "externalOpen");
          return start();
        });
      });


    it('Visits the app root url', () => {
        cy.visit('/dist/splash.html')
        cy.contains('h1', 'Welcome to Your Vue.js + TypeScript App');
    });
});
