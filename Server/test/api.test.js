const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server/server");
const fetch = require("node-fetch");
require("dotenv").config();
const CONSTANTS = require("../server/constants/constant");
//Assertion Style
var should = require("chai").should();
chai.use(chaiHttp);

let tokenData = "";

const fetchToken = () => {
  describe(`${process.env.CONFIG_API}`, () => {
    /**
     * Test the GET route
     */
    describe(`${process.env.GET} /${process.env.TEST_CONFIG_ENDPOINT}`, () => {
      // Negative Test case based on JWT not provided
      it(`${CONSTANTS.ALL_CONFIG_DATA}`, (done) => {
        chai
          .request(server)
          .get(`/${process.env.TEST_CONFIG_ENDPOINT}`)
          .set(
            `${process.env.AUTHORIZATION}`,
            `${process.env.BEARER} ` + tokenData
          )
          .set(`${CONSTANTS.ROLE}`, `${CONSTANTS.TESTUSER}`)
          .end((err, response) => {
            should.exist(response.body);
            response.should.have.status(200);
            response.body.code.should.be.eq(2001);
            response.body.message.should.equal(`${CONSTANTS.SUCCESS}`);
            response.body.data.should.be.a("array");
            response.body.data.length.should.be.eq(2);
            response.body.data[0].should.have.property("person_types");
            response.body.data[0].person_types.should.be.a("array");
            response.body.data[1].should.have.property("product_types");
            response.body.data[1].product_types.should.be.a("array");
            done();
          });
      });

      it(`${CONSTANTS.FAILURE}`, (done) => {
        chai
          .request(server)
          .get(`/${CONSTANTS.CONFIG_FAILURE_ENDPOINT}`)
          .set(
            `${process.env.AUTHORIZATION}`,
            `${process.env.BEARER} ` + tokenData
          )
          .set(`${CONSTANTS.ROLE}`, `${CONSTANTS.TESTUSER}`)
          .end((err, response) => {
            response.should.have.status(404);
            done();
          });
      });
    });

    // GET /brand --------------------------------------------------------------------------------

    describe(`${process.env.GET} /${CONSTANTS.BRAND}`, () => {
      it(`${CONSTANTS.BRAND_SUCCESS_TEST_CASE}`, (done) => {
        chai
          .request(server)
          .get(`/${CONSTANTS.BRAND}`)
          .query({
            email: `${process.env.USER_EMAIL}`,
          })
          .set(
            `${process.env.AUTHORIZATION}`,
            `${process.env.BEARER} ` + tokenData
          )
          .set(`${CONSTANTS.ROLE}`, `${CONSTANTS.TESTUSER}`)
          .end((err, response) => {
            should.exist(response.body);
            response.should.have.status(200);
            response.body.should.have.property("data");
            response.body.data.should.be.a("array");
            response.body.data[0].should.have.property("endpoint");
            response.body.data[0].should.have.property("account_name");
            response.body.should.have.property("message");
            done();
          });
      });

      it(`${CONSTANTS.BRAND_FAILURE_TEST_CASE}`, (done) => {
        chai
          .request(server)
          .get(`/${CONSTANTS.BRAND_FAILURE_ENDPOINT}`)
          .set(
            `${process.env.AUTHORIZATION}`,
            `${process.env.BEARER} ` + tokenData
          )
          .set(`${CONSTANTS.ROLE}`, `${CONSTANTS.TESTUSER}`)
          .end((err, response) => {
            response.should.have.status(404);
            done();
          });
      });
    });
  });
};

fetchToken();


// signup and Normal login test cases using chai and mocha

const PostUserToSignup = () => {
  describe(`Signup API`, () => {
    /**
     * Test the Signup route
     */
    describe(`post /auth/user/signup`, () => {
      it("It should add a user with endpoint /auth/user/signup", (done) => {
        const body = {
          email: "test4@lily.ai",
          password: "test4",
          role: "615170ed674a0c5437e9c4ce",
          firstName: "Test",
          lastName: "lily",
        };
        chai
          .request(server)
          .post("/auth/user/signup")
          .send(body)
          .end((err, response) => {
            response.should.have.status(201);
            response.body.should.be.a("object");
            response.body.code.should.be.eq(1001);
            response.body.should.have.property("code");
            response.body.code.should.be.a("number");
            response.body.should.have.property("message");
            response.body.message.should.be.a("string");
            response.body.message.should.equal(
              `You have signed up successfully`
            );
            response.body.data.should.have.property("accessToken");
            response.body.data.accessToken.should.be.a("string");
            response.body.data.should.have.property("email");
            response.body.data.email.should.be.a("string");
            response.body.data.email.should.equal("test4@lily.ai");
            response.body.data.should.have.property("password");
            response.body.data.password.should.be.a("string");
            response.body.data.should.have.property("role");
            response.body.data.role.should.be.a("string");
            response.body.data.role.should.equal(
              "615170ed674a0c5437e9c4ce" || "basic"
            );
            response.body.data.should.have.property("_id");
            response.body.data._id.should.be.a("string");
            response.body.data.should.have.property("firstName");
            response.body.data.firstName.should.equal("Test");
            response.body.data.firstName.should.be.a("string");
            response.body.data.should.have.property("lastName");
            response.body.data.lastName.should.equal("lily");
            response.body.data.lastName.should.be.a("string");
            done();
          });
      });
      it("It should show the error if user signup with existing email with endpoint /auth/user/signup", (done) => {
        const body = {
          email: "test4@lily.ai",
          password: "test4",
          role: "615170ed674a0c5437e9c4ce",
          firstName: "Test",
          lastName: "lily",
        };
        chai
          .request(server)
          .post("/auth/user/signup")
          .send(body)
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a("object");
            response.body.should.have.property("code");
            response.body.code.should.be.a("number");
            response.body.code.should.be.eq(1002);
            response.body.should.have.property("message");
            response.body.message.should.be.a("string");
            response.body.message.should.equal("Email already exist");
            done();
          });
      });

      it(`It should not Signup with endpoint /auth/user/sign`, (done) => {
        const body = {
          email: "test4@lily.ai",
          password: "test123",
          role: "615170ed674a0c5437e9c4ce",
          firstName: "Test4",
          lastName: "lily",
        };
        chai
          .request(server)
          .post(`/auth/user/sign`)
          .send(body)
          .end((err, response) => {
            response.should.have.status(404);
            done();
          });
      });

      it("If Email is not passed in the body, It should show user validation failed: email: Path 'email' is required.", (done) => {
        const body = {
          password: "test2",
          role: "615170ed674a0c5437e9c4ce",
          firstName: "Test",
          lastName: "lily",
        };
        chai
          .request(server)
          .post(`/auth/user/signup`)
          .send(body)
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a("object");
            response.body.code.should.be.eq(1002);
            response.body.message.should.be.a("object");
            response.body.message.should.have.property("_message");
            response.body.message._message.should.equal(
              "user validation failed"
            );
            response.body.message.should.have.property("name");
            response.body.message.name.should.be.a("string");
            response.body.message.name.should.equal(`ValidationError`);
            response.body.message.should.have.property("message");
            response.body.message.message.should.be.a("string");
            response.body.message.message.should.equal(
              "user validation failed: email: Path `email` is required."
            );
            response.body.message.errors.should.be.a("object");
            response.body.message.errors.email.should.be.a("object");
            response.body.message.errors.email.should.have.property("name");
            response.body.message.errors.email.name.should.be.a("string");
            response.body.message.errors.email.name.should.equal(
              `ValidatorError`
            );
            response.body.message.errors.email.should.have.property("message");
            response.body.message.errors.email.message.should.be.a("string");
            response.body.message.errors.email.message.should.equal(
              "Path `email` is required."
            );
            response.body.message.errors.email.should.have.property("kind");
            response.body.message.errors.email.kind.should.be.a("string");
            response.body.message.errors.email.kind.should.equal("required");
            response.body.message.errors.email.should.have.property("path");
            response.body.message.errors.email.path.should.be.a("string");
            response.body.message.errors.email.path.should.equal("email");
            response.body.message.errors.email.properties.should.have.property(
              "message"
            );
            response.body.message.errors.email.properties.message.should.be.a(
              "string"
            );
            response.body.message.errors.email.properties.message.should.equal(
              "Path `email` is required."
            );
            response.body.message.errors.email.properties.should.have.property(
              "type"
            );
            response.body.message.errors.email.properties.type.should.be.a(
              "string"
            );
            response.body.message.errors.email.properties.type.should.equal(
              "required"
            );
            response.body.message.errors.email.properties.should.have.property(
              "path"
            );
            response.body.message.errors.email.properties.path.should.be.a(
              "string"
            );
            response.body.message.errors.email.properties.path.should.equal(
              "email"
            );
            done();
          });
      });

      it('If Role is not passed in the body, It should show user validation failed: role: Cast to ObjectId failed for value "basic" (type string) at path "role"', (done) => {
        const body = {
          email: "test4@lily.ai",
          password: "test4",
          firstName: "Test4",
          lastName: "lily",
        };
        chai
          .request(server)
          .post(`/auth/user/signup`)
          .send(body)
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a("object");
            response.body.code.should.be.eq(1002);
            response.body.message.should.be.a("object");
            response.body.message.should.have.property("_message");
            response.body.message._message.should.equal(
              "user validation failed"
            );
            response.body.message.should.have.property("name");
            response.body.message.name.should.be.a("string");
            response.body.message.name.should.equal(`ValidationError`);
            response.body.message.should.have.property("message");
            response.body.message.message.should.be.a("string");
            response.body.message.message.should.equal(
              'user validation failed: role: Cast to ObjectId failed for value "basic" (type string) at path "role"'
            );
            response.body.message.errors.should.be.a("object");
            response.body.message.errors.role.should.be.a("object");
            response.body.message.errors.role.should.have.property("name");
            response.body.message.errors.role.name.should.be.a("string");
            response.body.message.errors.role.name.should.equal(`CastError`);
            response.body.message.errors.role.should.have.property("message");
            response.body.message.errors.role.message.should.be.a("string");
            response.body.message.errors.role.message.should.equal(
              'Cast to ObjectId failed for value "basic" (type string) at path "role"'
            );
            response.body.message.errors.role.should.have.property(
              "stringValue"
            );
            response.body.message.errors.role.stringValue.should.be.a("string");
            response.body.message.errors.role.stringValue.should.equal(
              '"basic"'
            );
            response.body.message.errors.role.should.have.property("valueType");
            response.body.message.errors.role.valueType.should.be.a("string");
            response.body.message.errors.role.valueType.should.equal("string");
            response.body.message.errors.role.should.have.property("kind");
            response.body.message.errors.role.kind.should.be.a("string");
            response.body.message.errors.role.kind.should.equal("ObjectId");
            response.body.message.errors.role.should.have.property("value");
            response.body.message.errors.role.value.should.be.a("string");
            response.body.message.errors.role.value.should.equal("basic");
            response.body.message.errors.role.should.have.property("path");
            response.body.message.errors.role.path.should.be.a("string");
            response.body.message.errors.role.path.should.equal("role");
            response.body.message.errors.role.should.have.property("reason");
            response.body.message.errors.role.reason.should.be.a("object");
            done();
          });
      });

      it("If FirstName is not passed in the body, It should show user validation failed: firstName: Path `firstName` is required.", (done) => {
        const body = {
          email: "test2@lily.ai",
          password: "test2",
          role: "615170ed674a0c5437e9c4ce",
          lastName: "lily",
        };
        chai
          .request(server)
          .post(`/auth/user/signup`)
          .send(body)
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a("object");
            response.body.code.should.be.eq(1002);
            response.body.message.should.be.a("object");
            response.body.message.should.have.property("_message");
            response.body.message._message.should.equal(
              "user validation failed"
            );
            response.body.message.should.have.property("name");
            response.body.message.name.should.be.a("string");
            response.body.message.name.should.equal(`ValidationError`);
            response.body.message.should.have.property("message");
            response.body.message.message.should.be.a("string");
            response.body.message.message.should.equal(
              "user validation failed: firstName: Path `firstName` is required."
            );
            response.body.message.errors.should.be.a("object");
            response.body.message.errors.firstName.should.be.a("object");
            response.body.message.errors.firstName.should.have.property("name");
            response.body.message.errors.firstName.name.should.be.a("string");
            response.body.message.errors.firstName.name.should.equal(
              `ValidatorError`
            );
            response.body.message.errors.firstName.should.have.property(
              "message"
            );
            response.body.message.errors.firstName.message.should.be.a(
              "string"
            );
            response.body.message.errors.firstName.message.should.equal(
              "Path `firstName` is required."
            );
            response.body.message.errors.firstName.should.have.property("kind");
            response.body.message.errors.firstName.kind.should.be.a("string");
            response.body.message.errors.firstName.kind.should.equal(
              "required"
            );
            response.body.message.errors.firstName.should.have.property("path");
            response.body.message.errors.firstName.path.should.be.a("string");
            response.body.message.errors.firstName.path.should.equal(
              "firstName"
            );
            response.body.message.errors.firstName.properties.should.be.a(
              "object"
            );
            response.body.message.errors.firstName.properties.should.have.property(
              "message"
            );
            response.body.message.errors.firstName.properties.message.should.be.a(
              "string"
            );
            response.body.message.errors.firstName.properties.message.should.equal(
              "Path `firstName` is required."
            );
            response.body.message.errors.firstName.properties.should.have.property(
              "type"
            );
            response.body.message.errors.firstName.properties.type.should.be.a(
              "string"
            );
            response.body.message.errors.firstName.properties.type.should.equal(
              "required"
            );
            response.body.message.errors.firstName.properties.should.have.property(
              "path"
            );
            response.body.message.errors.firstName.properties.path.should.be.a(
              "string"
            );
            response.body.message.errors.firstName.properties.path.should.equal(
              "firstName"
            );
            done();
          });
      });

      it("If lastName is not passed in the body, It should show user validation failed: lastName: Path `lastName` is required.", (done) => {
        const body = {
          email: "test2@lily.ai",
          password: "test2",
          role: "615170ed674a0c5437e9c4ce",
          firstName: "Test2",
        };
        chai
          .request(server)
          .post(`/auth/user/signup`)
          .send(body)
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a("object");
            response.body.code.should.be.eq(1002);
            response.body.message.should.be.a("object");
            response.body.message.should.have.property("_message");
            response.body.message._message.should.equal(
              "user validation failed"
            );
            response.body.message.should.have.property("name");
            response.body.message.name.should.be.a("string");
            response.body.message.name.should.equal(`ValidationError`);
            response.body.message.should.have.property("message");
            response.body.message.message.should.be.a("string");
            response.body.message.message.should.equal(
              "user validation failed: lastName: Path `lastName` is required."
            );
            response.body.message.errors.should.be.a("object");
            response.body.message.errors.lastName.should.be.a("object");
            response.body.message.errors.lastName.should.have.property("name");
            response.body.message.errors.lastName.name.should.be.a("string");
            response.body.message.errors.lastName.name.should.equal(
              `ValidatorError`
            );
            response.body.message.errors.lastName.should.have.property(
              "message"
            );
            response.body.message.errors.lastName.message.should.be.a("string");
            response.body.message.errors.lastName.message.should.equal(
              "Path `lastName` is required."
            );
            response.body.message.errors.lastName.should.have.property("kind");
            response.body.message.errors.lastName.kind.should.be.a("string");
            response.body.message.errors.lastName.kind.should.equal("required");
            response.body.message.errors.lastName.should.have.property("path");
            response.body.message.errors.lastName.path.should.be.a("string");
            response.body.message.errors.lastName.path.should.equal("lastName");
            response.body.message.errors.lastName.properties.should.be.a(
              "object"
            );
            response.body.message.errors.lastName.properties.should.have.property(
              "message"
            );
            response.body.message.errors.lastName.properties.message.should.be.a(
              "string"
            );
            response.body.message.errors.lastName.properties.message.should.equal(
              "Path `lastName` is required."
            );
            response.body.message.errors.lastName.properties.should.have.property(
              "type"
            );
            response.body.message.errors.lastName.properties.type.should.be.a(
              "string"
            );
            response.body.message.errors.lastName.properties.type.should.equal(
              "required"
            );
            response.body.message.errors.lastName.properties.should.have.property(
              "path"
            );
            response.body.message.errors.lastName.properties.path.should.be.a(
              "string"
            );
            response.body.message.errors.lastName.properties.path.should.equal(
              "lastName"
            );
            done();
          });
      });
    });
  });
};

PostUserToSignup();

const PostUserToLogin = () => {
  describe(`Login API`, () => {
    /**
     * Test the Login route
     */
    describe(`post /auth/user/login`, () => {
      it("It should get a JWE-Token with endpoint /auth/user/login by accepting email by google", (done) => {
        const body = {
          email: "nandan.c@sakhatech.com",
          password: "welcome",
        };
        chai
          .request(server)
          .post("/auth/user/login")
          .send(body)
          .end((err, response) => {
            response.should.have.status(201);
            response.body.should.be.a("object");
            response.body.should.have.property("data");
            response.body.data.should.be.a("object");
            response.body.should.have.property("accessToken");
            response.body.accessToken.should.be.a("string");
            response.body.data.should.have.property("firstName");
            response.body.data.firstName.should.be.a("string");
            response.body.data.firstName.should.equal("Nandan");
            response.body.data.should.have.property("lastName");
            response.body.data.lastName.should.be.a("string");
            response.body.data.lastName.should.equal("Chandramouli");
            response.body.data.should.have.property("email");
            response.body.data.email.should.be.a("string");
            response.body.data.email.should.equal(body.email);
            response.body.data.role.should.be.a("object");
            response.body.data.role.should.have.property("attributes");
            response.body.data.role.attributes.should.be.a("array");
            response.body.data.role.attributes.should.length(3);
            response.body.data.role.attributes[0].should.be.a("string");
            response.body.data.role.attributes[0].should.equal("users");
            response.body.data.role.attributes[1].should.be.a("string");
            response.body.data.role.attributes[1].should.equal("dashboard");
            response.body.data.role.attributes[2].should.be.a("string");
            response.body.data.role.attributes[2].should.equal("harvester");
            response.body.data.role.should.have.property("isActive");
            response.body.data.role.isActive.should.be.a("boolean");
            response.body.data.role.isActive.should.equal(true);
            response.body.data.role.should.have.property("_id");
            response.body.data.role._id.should.be.a("string");
            response.body.data.role.should.have.property("roleName");
            response.body.data.role.roleName.should.be.a("string");
            response.body.data.role.roleName.should.equal("admin");
            response.body.data.role.should.have.property("created_at");
            response.body.data.role.created_at.should.be.a("string");
            done();
          });
      });
      it(`It should not login with endpoint /auth/user/log`, (done) => {
        const body = {
          email: "nandan.c@sakhatech.com",
          password: "welcome",
        };
        chai
          .request(server)
          .post(`/auth/user/log`)
          .send(body)
          .end((err, response) => {
            response.should.have.status(404);
            done();
          });
      });

      it(`If email is not passed in the body or wrong email is passed in the body, It should show Email does not exist`, (done) => {
        const body = {
          password: "welcome",
        };

        chai
          .request(server)
          .post(`/auth/user/login`)
          .send(body)
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a("object");
            response.body.should.have.property("code");
            response.body.should.have.property("message");
            response.body.code.should.be.eq(1003);
            response.body.code.should.be.a("number");
            response.body.message.should.be.a("string");
            response.body.message.should.equal(`Email does not exist`);
            done();
          });
      });

      it(`If wrong password is passed in the body, It should show Password is not correct`, (done) => {
        const body = {
          email: "nandan.c@sakhatech.com",
          password: "hello",
        };

        chai
          .request(server)
          .post(`/auth/user/login`)
          .send(body)
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a("object");
            response.body.should.have.property("code");
            response.body.should.have.property("message");
            response.body.code.should.be.eq(1003);
            response.body.code.should.be.a("number");
            response.body.message.should.be.a("string");
            response.body.message.should.equal(`Password is not correct`);
            done();
          });
      });
    });
  });
};

PostUserToLogin();

