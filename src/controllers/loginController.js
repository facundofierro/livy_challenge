const jwt = require("jsonwebtoken");
var database = require("../database.js");
const conf = require("../../conf");

var loginController = () => {};

/**
 * Makes user authentication. Currently using harcoded users for sample application.
 */
loginController.authenticate = (user, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let currentUser = await database.User.find({
        name: user,
        password: password,
      });
      if (currentUser.length > 0) {
        const payload = {
          check: true,
          user: currentUser,
        };
        const token = jwt.sign(payload, conf.masterkey, {
          expiresIn: 1440,
        });
        resolve({
          mensaje: "Authentication successful",
          token: token,
        });
      } else reject({ message: "User not found" });
    } catch (e) {
      console.log(e.message);
      reject(e);
    }
  });
};

module.exports = loginController;
