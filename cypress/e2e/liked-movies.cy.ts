describe("Liked Movies Page", () => {
  beforeEach(() => {
    // Simulate user being logged in
    cy.window().then((win) => {
      const mockSession = {
        access_token: "mock-token",
        refresh_token: "mock-refresh",
        user: {
          id: "mock-user-id",
          email: "mock@example.com",
          user_metadata: { name: "Mock User" },
        },
      };

      win.localStorage.setItem(
        "supabase.auth.token",
        JSON.stringify([mockSession, mockSession])
      );
    });
  });

  it("shows loading state", () => {
    cy.intercept("GET", "/rest/v1/liked_movies*", {
      delay: 1000,
      statusCode: 200,
      body: [],
    }).as("getLiked");

    cy.visit("/liked?mock=1");
    cy.contains("LIKED MOVIES").should("exist");
    cy.get(".animate-pulse").should("have.length.greaterThan", 1); // Skeletons
  });

  it("shows empty state when no liked movies", () => {
    cy.intercept("GET", "/rest/v1/liked_movies*", {
      statusCode: 200,
      body: [],
    }).as("getLiked");

    cy.visit("/liked?mock=1");
    cy.contains("You haven't liked any movies 😢").should("exist");
  });

  it("shows liked movies when data exists", () => {
    cy.intercept("GET", "/rest/v1/liked_movies*", {
      statusCode: 200,
      body: [
        {
          id: 1,
          title: "Mock Movie",
          poster_path: "/poster.jpg",
          backdrop_path: null,
        },
      ],
    }).as("getLiked");

    cy.visit("/liked?mock=1");
    cy.contains("LIKED MOVIES").should("exist");
    cy.contains("Mock Movie").should("exist");
    cy.get("a[href^='/movie/']").should("have.length", 1);
  });
});
