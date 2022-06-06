/// <reference types="cypress" />

describe('tel 1', () => {
  //resetting inputs after each test
  afterEach(() => {

    cy.get('input[name="fullname"]').clear();
    cy.get('input[name="email"]').clear();
    cy.get('[type="checkbox"]').uncheck();
    cy.get('input[name="days"]').clear();
  })

  //using forceVisit because regular visit does not allow localhost
  it("init test", () => {
    cy.forceVisit('http://localhost:3000/');
    cy.contains('* Required Fields');
  })

  it("test 1 // no errors", () => {
    const uuid = () => Cypress._.random(0, 1e6);
    const id = uuid();
    var strName = `test name ${id}`;
    cy.get('input[name="fullname"]').type(strName); //just for fun, small random variation 
    
    cy.get('input[name="email"]').type('dragan.hadji-kotarov@musala.com');

    cy.get('input[name="flexible"]').click(); //checking if it works
    cy.get('input[name="flexible"]').click();

    cy.get('input[name="days"]').type('55');

    cy.get('button[type="submit"]').click();

    //actual verification // only testing if errors are not visible
    cy.get('span[name="fullname-valid"]').should('not.be.visible');
    cy.get('span[name="email-valid"]').should('not.be.visible');
    cy.get('span[name="days-valid"]').should('not.be.visible');
  })

  it("test 2 // no errors, days input test", () => {
    //TESTING minimal email 
    {
      cy.get('input[name="fullname"]').type('dragan');
      cy.get('input[name="email"]').type('ab@c.de');
      cy.get('input[name="flexible"]').click();
      cy.get('button[type="submit"]').click();

      //actual verification // only testing if errors are not visible
      cy.get('span[name="fullname-valid"]').should('not.be.visible');
      cy.get('span[name="email-valid"]').should('not.be.visible'); //email func should be satisfied
      cy.get('span[name="days-valid"]').should('not.be.visible');
    }

    //TESTING terribly long email
    {
      cy.get('input[name="email"]').clear();
      var strMoreThanTwoHundred = "dragan";
      for (var i=0; i<200; i++){
        strMoreThanTwoHundred += "dragan";
      }
      strMoreThanTwoHundred += "@musala.com";
      cy.get('input[name="email"]').type(strMoreThanTwoHundred);
      cy.get('button[type="submit"]').click();
    }
  })

  it("test 3 // no errors, days input test", () => {
    //TESTING empty input, but flexible enabled
    {
      cy.get('input[name="fullname"]').type('dragan');
      cy.get('input[name="email"]').type('dragan.hadji-kotarov@musala.com');
      cy.get('input[name="flexible"]').click();
      cy.get('button[type="submit"]').click();

      //actual verification // only testing if errors are not visible
      cy.get('span[name="fullname-valid"]').should('not.be.visible');
      cy.get('span[name="email-valid"]').should('not.be.visible');
      cy.get('span[name="days-valid"]').should('not.be.visible'); //no days added, so no error
    }


    //TESTING Text Characters, again flexible enabled
    {
      cy.get('input[name="days"]').clear();
      cy.get('input[name="days"]').type('abc');
      cy.get('span[name="days-valid"]').should('not.be.visible'); //no flexible clicked, so no error
    }
  })

  //test will not fail because save button is not clicked
  it("test 4 // again no errors", () => {
    cy.get('input[name="email"]').type('d');
    cy.get('input[name="flexible"]').click();

    //same verification
    cy.get('span[name="fullname-valid"]').should('not.be.visible');
    cy.get('span[name="email-valid"]').should('not.be.visible');
    cy.get('span[name="days-valid"]').should('not.be.visible');
  })


  //ERROR TESTING BELOW
  it("error test 1 // all errors", () => {
    cy.get('input[name="email"]').type('dragan');
    cy.get('button[type="submit"]').click();

    //basic verification
    cy.get('span[name="fullname-valid"]').should('be.visible');
    cy.get('span[name="email-valid"]').should('be.visible');
    cy.get('span[name="days-valid"]').should('be.visible');

    //error message verification
    cy.get('span[name="fullname-valid"]').contains('THIS FIELD IS REQUIRED');
    cy.get('span[name="email-valid"]').contains('Please enter valid email address');
    cy.get('span[name="days-valid"]').contains('THIS FIELD IS REQUIRED');
  })

  it("error test 2 // fullname errors", () => {
    //TESTING only single letter email
    {
      cy.get('button[type="submit"]').click();

      //verification
      cy.get('span[name="fullname-valid"]').should('be.visible');
      cy.get('span[name="fullname-valid"]').contains('THIS FIELD IS REQUIRED');
    }


    //TESTING duplicating name, thereby causing more than 100 characters
    {
      var strMoreThanHundred = "dragan";
      for (var i=0; i<20; i++){
        strMoreThanHundred += "dragan";
      }
      cy.get('input[name="fullname"]').type(strMoreThanHundred);
      cy.get('button[type="submit"]').click();

      //verification
      cy.get('span[name="fullname-valid"]').should('be.visible');
      cy.get('span[name="fullname-valid"]').contains('Your Full Name is over 100 characters');
    }

  })

  it("error test 3 // email errors", () => {
    //TESTING only single letter email
    {
      cy.get('input[name="email"]').type('d');
      cy.get('button[type="submit"]').click();

      //verification
      cy.get('span[name="email-valid"]').should('be.visible');
      cy.get('span[name="email-valid"]').contains('Please enter valid email address');
    }


    //TESTING duplicating email
    {
      cy.get('input[name="email"]').clear();
      var strMoreThanTwenty = "dragan.hadji-kotarov@musala.com";
      for (var i=0; i<20; i++){
        strMoreThanTwenty += "dragan.hadji-kotarov@musala.com";
      }
      cy.get('input[name="email"]').type(strMoreThanTwenty);
      cy.get('button[type="submit"]').click();

      //verification
      cy.get('span[name="email-valid"]').should('be.visible');
      cy.get('span[name="email-valid"]').contains('Please enter valid email address');
    }


    //TESTING email with no dot-something (like dotcom)
    {
      cy.get('input[name="email"]').clear();
      cy.get('input[name="email"]').type('dragan@musala');
      cy.get('button[type="submit"]').click();

      //verification
      cy.get('span[name="email-valid"]').should('be.visible');
      cy.get('span[name="email-valid"]').contains('Please enter valid email address');
    }


    //TESTING email with no at (like @)
    {
      cy.get('input[name="email"]').clear();
      cy.get('input[name="email"]').type('dragan.com');
      cy.get('button[type="submit"]').click();

      //verification
      cy.get('span[name="email-valid"]').should('be.visible');
      cy.get('span[name="email-valid"]').contains('Please enter valid email address');
    }


    //TESTING email with quotes
    {
      cy.get('input[name="email"]').clear();
      cy.get('input[name="email"]').type('"I""am""dragan@hadji.kotarov"');
      cy.get('button[type="submit"]').click();

      //verification
      cy.get('span[name="email-valid"]').should('be.visible');
      cy.get('span[name="email-valid"]').contains('Please enter valid email address');
    }
    
    
    //TESTING clearly invalid email characters
    {
      cy.get('input[name="email"]').clear();
      cy.get('input[name="email"]').type('this(email)address[should]be/wrong;as:well@gmail.com');
      cy.get('button[type="submit"]').click();

      //verification
      cy.get('span[name="email-valid"]').should('be.visible');
      cy.get('span[name="email-valid"]').contains('Please enter valid email address');
    }
  })

  it("error test 4 // days errors", () => {
    //TESTING empty days
    {
      cy.get('input[name="days"]').clear();
      cy.get('button[type="submit"]').click();

      //verification
      cy.get('span[name="days-valid"]').should('be.visible'); //no flexible clicked, so no error
      cy.get('span[name="days-valid"]').contains('THIS FIELD IS REQUIRED');
    }
    //TESTING text days
    {
      cy.get('input[name="days"]').type('abc');
      cy.get('button[type="submit"]').click();

      //verification
      cy.get('span[name="days-valid"]').should('be.visible'); //no flexible clicked, so no error
      cy.get('span[name="days-valid"]').contains('Your days of availability are not specified!');
    }
  })
})
