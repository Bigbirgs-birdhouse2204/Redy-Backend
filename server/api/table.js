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

router.get('/restaurant/:id', async (req, res, next) => {
  try {
    const singleTable = await DiningTable.findAll({
      where: { restaurantId: req.params.id, isOccupied: false },
    });

    res.json(singleTable);
  } catch (err) {
    next(err);
  }
});
