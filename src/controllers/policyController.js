var database = require("../database.js");

var policyController = () => {};

policyController.getPoliciesByUserName = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let client = await database.Client.findOne({ name: name });
      let policies = await database.Policy.find({ clientId: client.id });
      resolve(policies);
    } catch (e) {
      console.log(e.message);
      reject(e);
    }
  });
};

module.exports = policyController;
