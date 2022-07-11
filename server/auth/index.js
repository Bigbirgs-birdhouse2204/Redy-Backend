const router = require('express').Router()
const { models: {User, RestaurantOwner }} = require('../db')
module.exports = router


router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post('/business/login', async (req, res, next) => {
  try {
    let auth = await User.authenticateBusiness(req.body);
    let owner = RestaurantOwner.findOne({where: {userId: auth.userId}});

    if (!owner){
      const error = Error('This is account is not a business account');
      error.status = 401;
      throw error;
    }
    res.send({ token: auth.token,  });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {

    const user = await User.create(req.body)
    res.send({token: await user.generateToken()})
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})
router.post('/business/signup', async (req, res, next) => {
  try {

    const user = await User.create(req.body)
    await user.createRestaurantOwner();
    // await RestaurantOwner.findOne({where: {userId: user.id}})

    res.send({token: await user.generateToken()})
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization))
  } catch (ex) {
    next(ex)
  }
})
