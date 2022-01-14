const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const { requireToken, isAdmin } = require("./gateKeepingMiddleware.js");
module.exports = router;

//Tim made this change
// FIND ALL USERS
router.get("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.send(users);
  } catch (err) {
    next(err);
  }
});
