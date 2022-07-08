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

router.get('/:id', async (req, res, next) => {
  try {
    const singleRestaurant = await Reservation.findByPk(req.params.id);

    res.json(singleRestaurant);
  } catch (err) {
    next(err);
  }
});

//adding reservation
// router.post('/', async (req, res, next) => {
//   try {
//     await Reservation.create(req.body.product);
//     res.sendStatus(201);
//   } catch (err) {
//     next(err);
//   }
// });

//adding reservation
router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Reservation.create(req.body));
  } catch (error) {
    next(error);
  }
});
