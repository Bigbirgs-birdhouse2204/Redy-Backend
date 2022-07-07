const router = require('express').Router();
const {
  models: { DiningTable },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const diningTable = await DiningTable.findAll();
    res.json(diningTable);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const singleTable = await DiningTable.findByPk(req.params.id);

    res.json(singleTable);
  } catch (err) {
    next(err);
  }
});

router.get('/restaurant/:restaurantId', async (req, res, next) => {
  try {
    const s = await DiningTable.findAll({
      where: { restaurantId: req.params.restaurantId },
    });

    res.json(singleTable);
  } catch (err) {
    next(err);
  }
});
