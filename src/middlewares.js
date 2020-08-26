import jwt from 'jsonwebtoken';
import conf from '../conf.js';

const middlewares = {
  tokenVerify: (req, res, next) => {
    const authorization = req.headers.authorization.split(' ');
    const authorizationMethod = authorization[0];
    const token = authorization[1];
    if (token && authorizationMethod === 'Bearer') {
      jwt.verify(token, conf.masterkey, (err, decoded) => {
        if (err) {
          return res.json({ mensaje: 'Invalid token' });
        }
        req.decoded = decoded;
        return next();
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
