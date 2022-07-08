const router = require('express').Router();
const {
  models: { Reservation },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const reservation = await Reservation.findAll();
    res.json(reservation);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { data } = await Reservation.create(req.body);
    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const singleRestaurant = await Reservation.findByPk(req.params.id);

    res.json(singleRestaurant);
  } catch (err) {
    next(err);
  }
});
