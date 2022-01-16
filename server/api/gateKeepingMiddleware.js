const {
  models: { User },
} = require("../db");

const requireToken = async (req, res, next) => {
  try {
    console.log("req.headers:", req.headers)
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    console.log("USER:", user)
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send("Not Gonna Happen");
  } else {
    //if my user is an admin, pass them forward!
    next();
  }
};

const isUser = (req, res, next) => {
  if (parseInt(req.user.id) !== parseInt(req.params.userId)) {
    return res.status(403).send("Unable to view others' carts")
  }
  console.log("cleared isUser middleware")
  next()
}

module.exports = {
  requireToken,
  isAdmin,
  isUser
};
