const storedStatus = require("../../__mocks__/storedStatusMock.json");

const statusCollectionDouble = {
  findOne: query => {
    if (query._id === "backEndStatus") {
      return storedStatus;
    } else {
      return null;
    }
  },
  updateOne: (query, update) => {
    if (query._id === "backEndStatus") {
      return update;
    } else {
      return null;
    }
  }
};

module.exports = { statusCollectionDouble };
