const router = require('express').Router();
const {
  models: { User, RestaurantOwner },
} = require('../db');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    let auth = await User.authenticate(req.body);
    let owner = await RestaurantOwner.findOne({
      where: { userId: auth.userId },
    });

    const isOwner = owner ? true : false;

    res.send({ token: auth.token, isOwner });
  } catch (err) {
    next(err);
  }
});

// router.post('/business/login', async (req, res, next) => {
//   try {
//     let auth = await User.authenticateBusiness(req.body);
//     let owner = RestaurantOwner.findOne({ where: { userId: auth.userId } });

//     if (!owner) {
//       const error = Error('This is account is not a business account');
//       error.status = 401;
//       throw error;
//     }
//     res.send({ token: auth.token });
//   } catch (err) {
//     next(err);
//   }
// });

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});
router.post('/business/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    await user.createRestaurantOwner();
    // await RestaurantOwner.findOne({where: {userId: user.id}})

    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    //  "auth": Object {
    //   "createdAt": "2022-07-11T04:58:51.905Z",
    //   "email": "customer1@gmail.com",
    //   "firstName": "Customer",
    //   "id": 5,
    //   "isAdmin": false,
    //   "lastName": "1",
    //   "password": "$2b$05$3zm3KMyngavSMyC1HCEUyu5L4gPpB3jtPaF7K/40Us7awKCeU8TeG",
    //   "phone": "555-555-5555",
    //   "updatedAt": "2022-07-11T04:58:51.905Z",
    // },

    res.send({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
    });
  } catch (ex) {
    next(ex);
  }
});
