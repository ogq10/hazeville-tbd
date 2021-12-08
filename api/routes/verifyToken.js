const jwt = require('jsonwebtoken');

//how to verify token

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token; //provide token here in headers instead of body, and write Bearer and insert jwt
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) res.status(403).json('Token is not valid');
      req.user = user;
      next(); //leave function then go to router to continue running router.put
    });
  } else {
    return res.status(401).json('You are not authenticated');
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      //if the user id is equal to params id or is admin then continue route function
      next();
    } else {
      res.status(403).json("You don't have permission to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      //if the user is admin then continue
      next();
    } else {
      res
        .status(403)
        .json("You don't have permission to do that! Only Admin can do that.");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
