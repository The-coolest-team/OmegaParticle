const router = require("express").Router();
const { models: { Animal } } = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const animals = await Product.findAll();
    res.send(animals);
  } catch (err) {
    next(err);
  }
});

router.get("/:animalId", async (req, res, next) => {
  try{
    const singleAnimal = await Product.findByPk(req.params.animalId);
    res.send(singleAnimal);
  }catch(err){
    next(err)
  }
})
