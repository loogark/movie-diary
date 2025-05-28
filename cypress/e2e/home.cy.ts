describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the homepage greeting", () => {
    cy.contains("Hello, ragool 👋 What you have been watching ?").should(
      "exist"
    );
  });

  it("should display all section headings", () => {
    cy.contains("RELEASING THIS WEEK").should("exist");
    cy.contains("POPULAR MOVIES").should("exist");
    cy.contains("ON-AIR SHOWS").should("exist");
    cy.contains("POPULAR SHOWS").should("exist");
  });

  it("should show 6 or fewer movie cards per section", () => {
    cy.contains(/releasing this week/i)
      .should("exist")
      .closest("div")
      .parent() // go one level higher if needed
      .within(() => {
        cy.get("a[href^='/movie/']").should("have.length.lte", 6);
      });

    cy.contains(/popular movies/i)
      .should("exist")
      .closest("div")
      .parent()
      .within(() => {
        cy.get("a[href^='/movie/']").should("have.length.lte", 6);
      });
  });

  it("should navigate to the full section when clicking More", () => {
    cy.contains("RELEASING THIS WEEK").parent().contains("MORE").click();

    cy.url().should("include", "/new-releases");
  });

  it("should show at least one review card if data exists", () => {
    // We'll look for a pattern in your ReviewCard:
    // - movie name (bold)
    // - review content (paragraph)
    cy.get("h3").then(($headings) => {
      const hasReviewHeading = [...$headings].some(
        (el) => el.textContent?.trim().length
      );
      if (hasReviewHeading) {
        cy.get("p").should("exist");
      }
    });
  });
});
