const router = require('express').Router();
const {
  models: { User, RestaurantOwner, Restaurant },
} = require('../db');
module.exports = router;

router.post('/restaurants', async (req, res, next) => {
  try {

    const user = await User.findByToken(req.headers.authorization)
    let owner = RestaurantOwner.findOne({where: {userId: user.id}});

    const restaurants = await Restaurant.findAll({where: {
      ownerId: owner.id
      // attributes: ['id', 'email', 'firstName', 'lastName', 'phone']
    }});
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
