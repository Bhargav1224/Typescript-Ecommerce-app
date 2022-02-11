const ac = require("./../grantObject");
const CONSTANTS = require("../constants/constant");
const HELPER = require("../helpers/helper");
require("dotenv").config();
const LoggerInfo = require("../helpers/logger");
const label = "dashBoardController";
const info = "info";
const errorMessage = "error";

exports.testFunction = async (req, res, next) => {
  try {
    let user = res.locals.loggedInUser;
    // Grant permission who can use this API
    ac.grant(CONSTANTS.ROLE_PRODUCT_ADMIN).read("test");
    ac.grant(CONSTANTS.ROLE_BASIC).create("test");
    // check permission whether current user can use the API
    const permission = ac.can(user.role).read("test");
    if (permission.granted) {
      return res.status(200).json({
        result: "test",
      });
    } else {
      return res.status(403).json({
        message: CONSTANTS.ACCESS_DENIED,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: CONSTANTS.SOMETHING_WRONG,
    });
  }
};

const getPersonTypes = HELPER.callAPI(
  `${process.env.CLIENT_HOSTNAME}/${process.env.PERSON_TYPE_ENDPOINT}`,
  CONSTANTS.GET,
  null,
  null,
  null,
  process.env.CLIENT_BASIC_TOKEN
);
const getProductTypes = HELPER.callAPI(
  `${process.env.CLIENT_HOSTNAME}/${process.env.PRODUCT_TYPE_ENDPOINT}`,
  CONSTANTS.GET,
  null,
  null,
  null,
  process.env.CLIENT_BASIC_TOKEN
);
exports.getBrandApi = async (req, res, next) => {
  const { email } = req.query;
  const filter = {};
  if (email) {
    filter.email = email;
  }
  LoggerInfo(label, info).info(`Brand Api is Initiated by ${email}`);
  try {
    HELPER.callAPI(
      `${process.env.CLIENT_HOSTNAME}/${process.env.BRAND_ENDPOINT}`,
      CONSTANTS.GET,
      null,
      filter,
      null,
      process.env.CLIENT_BASIC_TOKEN
    )
      .then((response) => {
        if (response[0] && response[0].endpoint) {
          LoggerInfo(label, info).info(
            `${email} fetched Endpoint: ${response[0].endpoint} Successfully.`
          );
        }
        if (response && response.error) {
          LoggerInfo(label, info).info(
            `Brand Api called by ${response.error} with Email: ${email}`
          );
        }
        return res.status(200).json({
          code: 2001,
          message: CONSTANTS.SUCCESS,
          data: response,
        });
      })
      .catch((error) => {
        LoggerInfo(label, errorMessage).error(
          `While calling Brand API: ${error.message} with Email: ${email}`
        );
        return res.status(400).json({
          code: 2002,
          message: error.message,
        });
      });
  } catch (error) {
    LoggerInfo(label, errorMessage).error(
      `While calling Brand API: ${error.message} with Email: ${email}`
    );
    return res.status(500).json({
      code: 2003,
      message: CONSTANTS.SOMETHING_WRONG,
    });
  }
};

exports.getAllApis = async (req, res, next) => {
  try {
    Promise.all([getPersonTypes, getProductTypes])
      .then((response) => {
        return res.status(200).json({
          code: 2001,
          message: CONSTANTS.SUCCESS,
          data: response,
        });
      })
      .catch((error) => {
        return res.status(400).json({
          code: 2002,
          message: error.message,
        });
      });
  } catch (error) {
    return res.status(500).json({
      code: 2003,
      message: CONSTANTS.SOMETHING_WRONG,
    });
  }
};
