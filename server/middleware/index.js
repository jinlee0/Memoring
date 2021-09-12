const jwt = require('jsonwebtoken');

const middlewares = {
  isLoggedIn(req, res, next) {
    try {
      const token = req.headers.authorization;
      console.log(token);
      if (!token) {
        return res.status(401).json({ msg: 'token is required' });
      }
      else {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
          if (error) {
            return res.status(401).json({ msg: 'token is expried' });
          }
          else {
            req.decoded = decoded;
            next();
          }
        })
      }
    } catch (err) {
      console.error(err);
    }
  }
};


module.exports = middlewares;