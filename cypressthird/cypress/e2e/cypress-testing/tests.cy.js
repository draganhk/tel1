/// <reference types="cypress" />

describe('tel 1', () => {
  
  //using forceVisit because regular visit does not allow localhost
  it("init test", () => {
    cy.forceVisit('http://localhost:3000/')
    cy.contains('* Required Fields')
  })

  it("test 1 // no errors", () => {
    const uuid = () => Cypress._.random(0, 1e6)
    const id = uuid()
    var strName = `test name ${id}`
    cy.get('input[name="fullname"]').type(strName); //just for fun, small random variation 
    
    cy.get('input[name="email"]').type('dragan.hadji-kotarov@musala.com');

    cy.get('input[name="flexible"]').click(); //checking if it works
    cy.get('input[name="flexible"]').click();

    cy.get('input[name="days"]').type('55');

    cy.get('button[type="submit"]').click();

    //actual verification
    cy.get('span[name="fullname-valid"]').should('not.be.visible')
    cy.get('span[name="email-valid"]').should('not.be.visible')
    cy.get('span[name="days-valid"]').should('not.be.visible')

  })
})
