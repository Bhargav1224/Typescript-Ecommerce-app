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
