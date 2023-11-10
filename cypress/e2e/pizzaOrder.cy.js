describe("Pizza Test", function () {
  this.beforeEach(() => {
    cy.visit("/");
  });

it("Anasayfada tıklanan link ile gidilen sayfanın url'si /pizza mı?", function () {
    cy.get("[data-test-id=main-page-link]").click();
    cy.url().should("include", "pizza");
})

it("Sipariş formunda isim bölümünde 2 karakterden az olamaz hata mesajı geliyor mu?", function () {
    cy.get("[data-test-id=main-page-link]").click();
    cy.get("#name-input").type("e");
    cy.contains("İsim en az iki karakter olmalıdır.");
})

it("Pizza sayısını azaltıp arttırabiliyor muyum ben?", function () {
    cy.get("[data-test-id=main-page-link]").click();
    cy.get('[type="radio"]').check()
    cy.get("#increase").click();
    cy.get("[data-test-id=numberofpizza]").contains("2")
    cy.get("#decrease").click();
    cy.get("[data-test-id=numberofpizza]").contains("1")
})

  it("Pizza Siparis et", function () {
    cy.get("[data-test-id=main-page-link]").click();
    cy.get('[type="radio"]').check();
    cy.get("#size-dropdown").select("Kalın");
    cy.get("#name-input").type("isim");
    cy.get("#special-text").type("çabuk gelsin");
    cy.get('[type="radio"]').check();
    cy.get("#increase").click();
    cy.get("#button-order").click();
  });
});
