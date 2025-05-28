describe("Movie Page", () => {
  it("renders movie details from mock API", () => {
    cy.visit("/movie/1?mock=1");

    cy.contains("Mock Movie Title").should("exist");
    cy.get("img[src*='mock-poster.jpg']").should("exist");
    cy.get("img[src*='mock-backdrop.jpg']").should("exist");
    cy.contains("This is a mock overview of the movie.").should("exist");

    cy.contains("Write a Review").should("exist"); // assuming a label/button in WriteReview
  });
});
