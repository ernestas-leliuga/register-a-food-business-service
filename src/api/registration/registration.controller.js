const { validate } = require("../../services/validation.service");
const {
  saveRegistration,
  getFullRegistrationById,
  sendTascomiRegistration,
  getRegistrationMetaData,
  sendFboEmail,
  sendLcEmail
} = require("./registration.service");

const { logEmitter } = require("../../services/logging.service");

const createNewRegistration = async registration => {
  logEmitter.emit(
    "functionCall",
    "registration.controller",
    "createNewRegistration"
  );
  // AUTHENTICATION

  // VALIDATION
  if (registration === undefined) {
    throw new Error("registration is undefined");
  }
  const errors = validate(registration);
  if (errors.length) {
    const err = new Error();
    err.name = "validationError";
    err.validationErrors = errors;
    throw err;
  }

  // RESOLUTION
  // This is a stubbed email until LC lookup is implemented
  const localCouncilContactDetails = {
    local_council: "Rushmoor Borough Council",
    local_council_email: "fsatestemail.valid@gmail.com",
    local_council_phone_number: "12345678"
  };
  const metaDataResponse = await getRegistrationMetaData();
  const tascomiResponse = await sendTascomiRegistration(
    registration,
    metaDataResponse["fsa-rn"]
  );
  const tascomiObject = JSON.parse(tascomiResponse);
  const response = await saveRegistration(registration);

  const emailSuccessOrFailureFbo = await sendFboEmail(
    registration,
    metaDataResponse,
    localCouncilContactDetails
  );

  const emailSuccessOrFailureLc = await sendLcEmail(
    registration,
    metaDataResponse,
    localCouncilContactDetails
  );

  const combinedResponse = Object.assign(
    response,
    metaDataResponse,
    {
      tascomiResponse: tascomiObject
    },
    emailSuccessOrFailureFbo,
    emailSuccessOrFailureLc
  );

  logEmitter.emit(
    "functionSuccess",
    "registration.controller",
    "createNewRegistration"
  );
  return combinedResponse;
};

const getRegistration = async id => {
  // AUTHENTICATION

  // RESOLUTION
  const response = await getFullRegistrationById(id);

  return response;
};

module.exports = { createNewRegistration, getRegistration };
