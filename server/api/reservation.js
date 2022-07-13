const router = require('express').Router();
const {
  models: { Reservation, DiningTable, ReservedSeating, User, Restaurant  },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const reservation = await Reservation.findAll({include: DiningTable});
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
      },
      include: [DiningTable, {
        model: User,
        attributes:['firstName', 'lastName', 'phone']

      }]
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

    const user = await User.findByPk(req.body.userId)
    const restaurant = await Restaurant.findByPk(req.body.restaurantId)
    const diningTable = await DiningTable.findByPk(req.body.diningTableId)
    // const resData ={
    //   status: req.body.status,
    //   partySize: req.body.partySize,
    //   restaurantId: req.body.restaurantId,
    //   userId: req.body.userId,
    // }

  const reservation =  await user.createReservation({
      status: req.body.status,
      partySize: req.body.partySize,
    });

    await reservation.setRestaurant(restaurant)
    // const { data } = await Reservation.create(resData);
    await reservation.addDiningTable(diningTable);
    res.status(201).send(reservation);
  } catch (error) {
    next(error);
  }
});


