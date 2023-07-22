describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000');
    cy.get("nav").should("exist");
    cy.get('[data-testid="loading-section"]').should("exist");
    // Wait for the data to be fetched and test the data display
    cy.wait(1000); // Assuming the API request is made using Cypress's route and alias functionality.
    cy.get('[data-testid="loading-section"]').should("not.exist"); // Loading section should be removed.
    cy.get("div[data-testid='cities-section']").should("exist");
    cy.get("div[data-testid='cities-section']").children().should("have.length.above", 0);
    // Test the data display
    // Test the number of cards
    cy.get("div[data-testid='card']").should("have.length.at.least", 7);


    // Click on the theme switcher button and check the theme change
    cy.get("[data-testid='theme-icon']").click();

    // Wait for the theme change to take effect (assuming there is some visual change indicating the theme)
    // You might need to adjust the waiting time based on the responsiveness of your application.
    cy.wait(500);

    // Check if the theme has changed by verifying the appearance of specific elements based on the theme
    // For example, you can check the color of some elements or the presence of specific icons related to the theme.
    // Assert that the light/dark mode-specific icon is visible based on the theme.

    // You can add more specific assertions related to the theme change if needed.

    // Click the theme switcher button again to revert to the original theme
    cy.get("[data-testid='theme-icon']").click();

    // Wait for the theme change to take effect
    cy.wait(500);

    // Click on all buttons
    cy.get("[data-testid='button']").each(($button) => {
      cy.wrap($button).click();
      cy.wait(500);
      cy.get("[data-testid='close-button']").click();
      // Add any specific assertions related to the button click behavior, if needed.
      // For example, you can assert that certain elements change on the UI after the button click.
    });
  })
})