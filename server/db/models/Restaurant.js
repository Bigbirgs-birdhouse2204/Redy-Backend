const Sequelize = require('sequelize');
const db = require('../db');


const Restaurant = db.define('restaurant', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: 1,
    },
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: 1,
    },
  },

});

module.exports = Restaurant;
