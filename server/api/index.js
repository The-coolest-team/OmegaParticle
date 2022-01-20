const router = require("express").Router();
module.exports = router;

router.get("/healthcheck", (req, res) => {
  return res.json({
    timestamp: new Date()
  })
})

router.use("/users", require("./users"));
router.use("/products", require("./products"));
router.use("/cart", require("./cart"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
