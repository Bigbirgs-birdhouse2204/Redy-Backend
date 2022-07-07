const express = require('express');

router.use(express.json());
const router = require('express').Router();
const {
  models: { User },
} = require('./db');
const path = require('path');
module.exports = router;

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.byToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

router.post('/api/auth', async (req, res, next) => {
  try {
    const user = await User.authenticate(req.body);
    if (!user) res.sendStatus(404);
    const token = await user.generateToken();
    res.send(token);
  } catch (ex) {
    next(ex);
  }
});

router.get('/api/auth', requireToken, async (req, res, next) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.sendStatus(404);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).send({ error: err.message });
});
