var database = require("../database.js");

var clientController = () => {};

clientController.getById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let client = await database.Client.findOne({ id: id });
      resolve(client);
    } catch (e) {
      console.log(e.message);
      reject(e);
    }
  });
};

clientController.getByName = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let client = await database.Client.findOne({ name: name });
      resolve(client);
    } catch (e) {
      console.log(e.message);
      reject(e);
    }
  });
};

clientController.getByPolicyId = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let policy = await database.Policy.findOne({ id: id });
      let client = await database.Client.findOne({ id: policy.client_id });
      resolve(client);
    } catch (e) {
      console.log(e.message);
      reject(e);
    }
  });
};

module.exports = clientController;
