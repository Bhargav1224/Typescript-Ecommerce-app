const request = require("request");
const CONSTANTS = require("../constants/constant");

exports.callAPI = (
  url,
  method,
  bodyData,
  queryParams,
  pathVariables,
  Headers
) => {
  if (bodyData) {
    bodyData = JSON.stringify(bodyData);
  }
  return new Promise((resolve, reject) => {
    let options = {
      method: method,
      url: url,
      headers: {},
      qs: {},
      body: null,
    };
    if (options.method == CONSTANTS.GET) {
      if (pathVariables) {
        options = {
          ...options,
          method: method,
          url: url + "/" + pathVariables,
          headers: {},
          qs: {},
          body: null,
        };
      } else if (Headers && queryParams) {
        options = {
          ...options,
          method: method,
          url: url,
          headers: { Authorization: `Basic ${Headers}` },
          qs: queryParams,
          body: null,
        };
      } else if (queryParams) {
        options = {
          ...options,
          method: method,
          url: url,
          headers: {},
          qs: queryParams,
          body: null,
        };
      } else if (Headers) {
        options = {
          ...options,
          method: method,
          url: url,
          headers: { Authorization: `Basic ${Headers}` },
          qs: queryParams,
          body: null,
        };
      } else {
        options = {
          ...options,
          method: method,
          url: url,
          headers: {},
          qs: {},
          body: null,
        };
      }
    }
    if (options.method == CONSTANTS.POST) {
      options = {
        ...options,
        method: method,
        url: url,
        headers: { "Content-Type": "application/json" },
        qs: {},
        body: bodyData,
      };
    }
    if (options.method == CONSTANTS.UPDATE) {
      if (pathVariables) {
        options = {
          ...options,
          method: method,
          url: url + "/" + pathVariables,
          headers: {},
          qs: {},
          body: bodyData,
        };
      }
    }
    if (options.method == CONSTANTS.DELETE) {
      if (pathVariables) {
        options = {
          ...options,
          method: method,
          url: url + "/" + pathVariables,
          headers: {},
          qs: {},
          body: null,
        };
      }
    }
    request(options, (error, response) => {
      if (error) throw reject(error);
      response.body = JSON.parse(response.body);
      if (options.method == "patch") {
        bodyData = JSON.parse(bodyData);
        const { status } = bodyData;
        response.body.status = status;
        resolve(response.body);
      }
      resolve(response.body);
    });
  });
};
