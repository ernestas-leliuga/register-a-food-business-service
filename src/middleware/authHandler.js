const { FRONT_END_NAME, FRONT_END_SECRET } = require("../config");
const { logEmitter } = require("../../src/services/logging.service");

const authHandler = (req, res, next) => {
  logEmitter.emit("functionCall", "authHandler.middleware", "authHandler");
  const secrets = {
    [FRONT_END_NAME]: FRONT_END_SECRET
  };
  const clientSecret = req.headers["api-secret"];
  const client = req.headers["client-name"];

  // Check that clientSecret is provided
  if (!clientSecret) {
    const err = new Error("Client secret not found");
    err.name = "clientSecretNotFound";
    logEmitter.emit(
      "functionFail",
      "authHandler.middleware",
      "authHandler",
      err
    );
    throw err;
  }

  // Check that client is provided
  if (!client) {
    const err = new Error("Client not found");
    err.name = "clientNotFound";
    logEmitter.emit(
      "functionFail",
      "authHandler.middleware",
      "authHandler",
      err
    );
    throw err;
  }
  const secret = secrets[client];

  // Check that client is supported
  console.log(client);
  if (!secret) {
    const err = new Error("Client not supported");
    err.name = "clientNotSupported";
    logEmitter.emit(
      "functionFail",
      "authHandler.middleware",
      "authHandler",
      err
    );
    throw err;
  }

  // Verify secret
  if (secret !== clientSecret) {
    const err = new Error("Secret invalid");
    err.name = "secretInvalid";
    logEmitter.emit(
      "functionFail",
      "authHandler.middleware",
      "authHandler",
      err
    );
    throw err;
  }
  logEmitter.emit("functionSuccess", "authHandler.middleware", "authHandler");
  next();
};

module.exports = { authHandler };
