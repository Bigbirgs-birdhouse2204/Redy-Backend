const Sequelize = require('sequelize');
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const axios = require('axios');

const SALT_ROUNDS = 5;

const phoneValidationRegex = /\d{3}-\d{3}-\d{4}/;

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: 1,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: 1,
    },
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      validator: function (v) {
        return phoneValidationRegex.test(v);
      },
    },
  },
  // radius: {
  //   type: Sequelize.INTEGER,
  //   defaultValue: 1,
  // },
  // role: {
  //   type: Sequelize.ENUM('customer', 'restaurant', 'admin'),
  //   defaultValue: 'customer',
  // },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

/**
 * classMethods
 */
User.authenticate = async function ({ email, password }) {
  const user = await this.findOne({ where: { email: email.toLowerCase() } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error('Incorrect username/password');
    error.status = 401;
    throw error;
  }
  // return user.generateToken();
  return { token: user.generateToken(), userId: user.id };
};

User.authenticateBusiness = async function ({ email, password }) {
  const user = await this.findOne({ where: { email: email.toLowerCase() } });

  if (!user || !(await user.correctPassword(password))) {
    const error = Error('Incorrect username/password');
    error.status = 401;
    throw error;
  }

  return { token: user.generateToken(), userId: user.id };
};

User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = User.findByPk(
      id
      // {attributes: ['id', 'email', 'firstName', 'lastName', 'phone']}
    );
    if (!user) {
      throw 'nooo';
    }
    return user;
  } catch (ex) {
    const error = Error('bad token');
    error.status = 401;
    throw error;
  }
};

/**
 * hooks
 */
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
