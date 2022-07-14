const router = require('express').Router();
const {
  models: { Restaurant, DiningTable },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const restaurants = await Restaurant.findAll({
      include:  [{
        model: DiningTable,
        where: {
          isOccupied: false
        }
      }]});
    res.json(restaurants);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const singleRestaurant = await Restaurant.findByPk(req.params.id);

    res.json(singleRestaurant);
  } catch (err) {
    next(err);
  }
});
