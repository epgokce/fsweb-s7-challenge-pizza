describe("Pizza Test", function () {
  this.beforeEach(() => {
    cy.visit("/");
  });

  it("Pizza Siparis et", function () {
    cy.get("[data-test-id=main-page-link]").click();
    cy.get('[type="radio"]').check();
    cy.get("#size-dropdown").select("Kalın");
    cy.get("#name-input").type("is");
    cy.contains("İsim en az 2 karakter olmalıdır");
    cy.get("#name-input").type("isim");
    cy.get("#special-text").type("çabuk gelsin");
    cy.get('[type="radio"]').check();
    cy.get("#increase").click();
    cy.get("#button-order").click();
  });
});
