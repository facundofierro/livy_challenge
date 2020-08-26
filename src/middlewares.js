import jwt from 'jsonwebtoken';

const middlewares = {
  tokenVerify: (req, res, next) => {
    const masterkey = process.env.TOKEN_GENERATION_MASTER_KEY;
    const authorization = req.headers.authorization.split(' ');
    const authorizationMethod = authorization[0];
    const token = authorization[1];
    if (token && authorizationMethod === 'Bearer') {
      jwt.verify(token, masterkey, (err, decoded) => {
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
