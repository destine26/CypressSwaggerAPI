const RandomString = require('../pages/generate-random-string');

describe('Swagger UI User API Tests', () => {

    before(() => {
        randomString = new RandomString();
    });
  
    beforeEach(() => {
        cy.visitSwaggerUI();
    });

    it('Verify fetch the Swagger UI JSON files', () => {
      cy.contains('Swagger Petstore');
    });
  
    //Create user
    it('Verify create a new user', () => {
      cy.window().then((win) => {
        const randomNum = Math.floor(Math.random() * 100 + 1);
        const randomStr = 'Alan' + Math.random().toString(25).substring();
  
        const userData = {
          id: randomNum,
          userName: randomStr,
          firstName: randomStr,
          lastName: randomStr,
          email: `${randomStr}@gmail.com`,
          password: randomStr,
          phone: '1234567890',
          userStatus: 0
        };
  
        cy.request({
          method: 'POST',
          url: `https://petstore.swagger.io/v2/user`,
          body: userData
        }).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body.code).to.equal(200);
          expect(response.duration).to.be.lessThan(3000);
        });
      });
    });

    //Update user
    it('Verify update user', () => {
        const updateData = {
            id: '9223372036854775807', 
            username: 'newUsername',
            firstName: 'newFirstName',
            lastName: 'newLastName',
            email: 'newEmail@example.com',
            password: 'newPassword',
            phone: '9876543210',
            userStatus: 1
        };
      
        cy.request({
          method: 'PUT',
          url: `https://petstore.swagger.io/v2/user/${updateData.firstName}`,
          body: updateData
        }).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body.code).to.equal(200);
          expect(response.duration).to.be.lessThan(3000);
        });
    });

    //Get user by user name
    it('Verify get user by user name', () => {
        const username = `{{userName}}`; 
                
        cy.request({
          method: 'GET',
          url: `https://petstore.swagger.io/v2/user/${username}`
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.duration).to.be.lessThan(3000);
            expect(response.body.firstName).to.eql('{{firstName}}');
            expect(response.body.lastName).to.eql('{{lastName}}');
            expect(response.body.userName).to.eql('{{userName}}');
            expect(response.body.email).to.eql('{{email}}');
            expect(response.body.password).to.eql('{{password}}');
            expect(response.body.phone).to.eql('{{phone}}');
        });
    });

    //Delete user
    it('Verify delete user', () => {
        const username = '{{userName}}';
          
        cy.request({
          method: 'DELETE',
          url: `https://petstore.swagger.io/v2/user/${username}`
        }).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.duration).to.be.lessThan(3000);
        });
    });
});
