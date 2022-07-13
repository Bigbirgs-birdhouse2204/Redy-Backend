const router = require('express').Router();
const {
  models: { Reservation, DiningTable, ReservedSeating  },
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

router.get('/business/:restaurantId', async (req, res, next) => {
  try {
    const reservation = await Reservation.findAll({
      where: {
        restaurantId: req.params.restaurantId
      }
    });
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
router.post('/', async (req, res, next) => {
  try {
    const resData ={
      status: req.body.status,
      partySize: req.body.partySize,
      restaurantId: req.body.restaurantId,
      userId: req.body.userId,
    }
    const { data } = await Reservation.create(resData);
    await data.addDiningTable(req.body.diningTableId);
    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
});


