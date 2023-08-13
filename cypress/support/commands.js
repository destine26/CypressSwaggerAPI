//Navigate to Swagger UI
Cypress.Commands.add('visitSwaggerUI', () => {
    cy.visit('https://petstore.swagger.io/#/pet');
});
  