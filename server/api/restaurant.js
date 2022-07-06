const router = require('express').Router();
const {
  models: { Restaurant },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const restaurants = await Restaurant.findAll();
    // res.send("Hello")
    res.json(restaurants);
  } catch (err) {
    next(err);
  }
});
