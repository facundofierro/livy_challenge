import { verify } from 'jsonwebtoken';
import { masterkey } from '../conf';

const middlewares = {
  tokenVerify: (req, res, next) => {
    const token = req.headers['access-token'];
    if (token) {
      verify(token, masterkey, (err, decoded) => {
        if (err) {
          return res.json({ mensaje: 'Invalid token' });
        }
        req.decoded = decoded;
        next();
      });
    } else {
      res.status(400).json({ mensaje: 'Token required' });
    }
  },

  isAdmin: (req, res, next) => {
    try {
      if (req.decoded.user[0].role === 'admin') {
        next();
      } else {
        res
          .status(400)
          .json({ mensaje: 'Access denied - Admin role required' });
      }
    } catch (e) {
      res.status(400).json(e);
    }
  },
};

export default middlewares;
