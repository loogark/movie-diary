describe("Movie Review Flow", () => {
  beforeEach(() => {
    // Mock Supabase login session
    cy.window().then((win) => {
      const session = {
        access_token: "mock-token",
        refresh_token: "mock-refresh",
        user: { id: "user-1", email: "test@mock.com" },
      };
      win.localStorage.setItem(
        "supabase.auth.token",
        JSON.stringify([session, session])
      );
    });
  });

  it("adds, edits, and deletes a movie review", () => {
    cy.visit("/movie/1?mock=1");

    // Add a review
    cy.contains("Write a review").should("exist");
    cy.get("textarea").type("Great movie!");
    cy.get('svg[aria-label="star 4"]').click(); // click 4th star (add testable aria label if needed)
    cy.contains("Submit").click();

    cy.contains("Great movie!").should("exist");
    cy.contains("★").should("exist"); // your star rating

    // Edit the review
    cy.get('button[aria-label="edit-review"]').click();
    cy.get("textarea").clear().type("Actually, it's amazing!");
    cy.contains("Save").click();
    cy.contains("Actually, it's amazing!").should("exist");

    // Delete the review
    cy.get('button[aria-label="delete-review"]').click();
    cy.contains("Actually, it's amazing!").should("not.exist");
    cy.contains("Write a review").should("exist");
  });
});
