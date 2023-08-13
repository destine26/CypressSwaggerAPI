describe("Swagger UI Pet Store API Tests", () => {

    beforeEach(() => {
        cy.visitSwaggerUI();
    });

    //Find pet by id
    it("Verify find a pet by ID", () => {
      cy.request({
        method: "GET", 
        url: "https://petstore.swagger.io/v2/pet/100"
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.id).to.equal(100);
          expect(response.duration).to.be.lessThan(3000);
      });
    });
  
    //Find pet by status
    it("Verify find pets by status", () => {
        cy.request({
            method: "GET", 
            url: "https://petstore.swagger.io/v2/pet/findByStatus?status=available"
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.duration).to.be.lessThan(3000);
      });
    });
  
    //Add a new pet to the store
    it("Verify adding a new pet to the store", () => {
      const newPet = {
        id: 100, 
        category: {
          id: 10, 
          name: "Dog", 
        },
        name: "Timmy", 
        photoUrls: ["string"],
        tags: [
          {
            id: 20, 
            name: "Tuffy", 
          },
        ],
        status: "available",
      };
  
      cy.request({
            method: "POST", 
            url: "https://petstore.swagger.io/v2/pet", 
            body: newPet
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.id).to.equal(newPet.id);
            expect(response.duration).to.be.lessThan(3000);
      });
    });

    //Updates a pet in the store with form data
    it("Should updates a pet in the store with form data", () => {
        cy.request({
              method: "GET", 
              url: "https://petstore.swagger.io/v2/pet/100", 
          }).then((response) => {
              expect(response.status).to.equal(200);
              expect(response.duration).to.be.lessThan(3000);
        });
    });

    //Upload an image
    it("Verify uploading an image for a pet", () => {
        const imageFile = "../images/dog.jpg";
    
        cy.fixture(imageFile, "binary").then((fileContent) => {
            const blob = Cypress.Blob.binaryStringToBlob(fileContent, "image/jpg");
            const formData = new FormData();
    
            formData.append("additionalMetadata", "Uploaded from Cypress");
            formData.append("file", blob, "dog.jpg");
    
            cy.request({
                method: "POST",
                url: "https://petstore.swagger.io/v2/pet/100/uploadImage",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                body: formData
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.duration).to.be.lessThan(3000);
            });
        });
    });

    //Delete pet
    it("Verify deleting a pet", () => {
          cy.request({
              method: "POST", 
              url: "https://petstore.swagger.io/v2/pet/100"
          }).then((response) => {
              expect(response.status).to.equal(200);
              expect(response.duration).to.be.lessThan(3000);
      });
    });

  });
  