const { constants } = require("../constants");

const errorHandler = (error, request, response, next) => {
  const statusCode = response.statusCode ? response.statusCode : 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      response.json({ title: "Validation Failed", message: error.message, stakeTrace: error.stack });
      break;
    case constants.UNAUTHORIZED:
      response.json({ title: "Unauthorized", message: error.message, stakeTrace: error.stack });
      break;
    case constants.FORBIDDEN:
      response.json({ title: "Forbidden", message: error.message, stakeTrace: error.stack });
      break;
    case constants.NOT_FOUND:
      response.json({ title: "Not Found", message: error.message, stakeTrace: error.stack });
      break;
    default:
      response.status(500).json({ title: "Server Error", message: error.message, stakeTrace: error.stack });
      break;
  }
};

module.exports = errorHandler;
