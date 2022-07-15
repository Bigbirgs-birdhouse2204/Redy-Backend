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

const reservation = await Reservation.findOne({where:{
  userId: req.body.userId
},
include: DiningTable
});
 if(reservation){

  const oldDiningTable = await DiningTable.findOne({where:{
    restaurantId: reservation.restaurantId
  }})
await oldDiningTable.update({isOccupied: false});
await ReservedSeating.destroy({
  where: {
    reservationId: reservation.id,
    diningTableId: oldDiningTable.id,
  },
});
await reservation.destroy();

 }


    const diningTable = await DiningTable.findByPk(req.body.diningTableId)
    const newReservation =  await user.createReservation({
        status: req.body.status,
        partySize: req.body.partySize,
      });
    await newReservation.setRestaurant(restaurant)
    await newReservation.addDiningTable(diningTable);
    res.status(201).send(newReservation);
  } catch (error) {
    next(error);
  }
});

router.post('/waitlist', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.body.userId)
    const restaurant = await Restaurant.findByPk(req.body.restaurantId)
    const reservation =  await user.createReservation({
        status: req.body.status,
        partySize: req.body.partySize,
      });
    await reservation.setRestaurant(restaurant)
    res.status(201).send(reservation);
  } catch (error) {
    next(error);
  }
});


