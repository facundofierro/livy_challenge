/* eslint-disable no-console */
import { sign } from 'jsonwebtoken';
import database from '../database';
import { masterkey } from '../../conf';

const loginController = {
  /**
   * Makes user authentication. Currently using harcoded users for sample application.
   */
  authenticate: async (user, password) => {
    let result;
    const currentUser = await database.User.find({
      name: user,
      password,
    });
    if (currentUser.length > 0) {
      const payload = {
        check: true,
        user: currentUser,
      };
      const token = sign(payload, masterkey, {
        expiresIn: 1440,
      });
      result = {
        mensaje: 'Authentication successful',
        token,
      };
    } else {
      result = { message: 'User not found' };
    }
    return result;
  },
};

export default loginController;
