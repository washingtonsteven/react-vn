describe("Basic App", () => {
  it("Should see the app", () => {
    cy.visit("http://localhost:3000");
    cy.title().should("include", "react-vn");
  });
});
