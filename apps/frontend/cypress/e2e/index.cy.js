describe("home page", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/");
  });

  it("loads without crashing", () => {});

  it("should show 20 recipe cards", () => {
    cy.get("[data-test-id='recipe-card']").should("have.length", 20);
  });

  it("can do valid search and show results", () => {
    cy.get("input[type='search']").should("be.visible").click().type("chicken", { delay: 200 });
    cy.get("[data-test-id='recipe-card']").should("have.length.greaterThan", 0);
  });

  it("can do bad search and show no results", () => {
    cy.get("input[type='search']")
      .should("be.visible")
      .click()
      .type("adfasdfasdf asdf", { delay: 200 });
    cy.get("[data-test-id='recipe-card']").should("have.length", 0);
  });

  it("should have three sort options", () => {
    cy.get(".ais-SortBy-select").select(0).should("have.value", "hellofresh_rating_desc");
    cy.get(".ais-SortBy-select").select(1).should("have.value", "hellofresh_rating_asc");
    cy.get(".ais-SortBy-select").select(2).should("have.value", "hellofresh");
  });

  it("should have working pagination", () => {
    cy.get("ul .ais-Pagination-item").should("have.length.greaterThan", 0);
  });

  it("can toggle color scheme", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.mantine-UnstyledButton-root > .mantine-Text-root').click();
    cy.get('.mantine-UnstyledButton-root > .mantine-Text-root').click();
    /* ==== End Cypress Studio ==== */
  });
});
