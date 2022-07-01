const Sequelize = require('sequelize');
const db = require('../db');


const Cuisine = db.define('cuisine', {
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: 1,
    },
  },
});

module.exports = Cuisine;
