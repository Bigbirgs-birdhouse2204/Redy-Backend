const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/owner', require('./owner'));
router.use('/restaurant', require('./restaurant'));
router.use('/table', require('./table'));
router.use('/maps', require('./maps'));
router.use('/reservation', require('./reservation'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
