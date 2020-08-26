/* eslint-disable no-console */
import jwt from 'jsonwebtoken';
import database from '../database.js';
import conf from '../../conf.js';

const loginController = {
  /**
   * Makes user authentication. Currently using harcoded users for sample application.
   */
  authenticate: async (user, password_) => {
    let result;
    const currentUser = await database.User.find({
      name: user,
      password: password_,
    });
    if (currentUser.length > 0) {
      const payload = {
        check: true,
        user: currentUser,
      };
      const token = jwt.sign(payload, conf.masterkey, {
        expiresIn: 1440,
      });
      result = {
        mensaje: 'Authentication successful',
        token,
        success: true,
      };
    } else {
      result = {
        message: 'User not found',
        success: false,
      };
    }
    return result;
  },
};

export default loginController;
