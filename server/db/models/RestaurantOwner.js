const Sequelize = require('sequelize');
const db = require('../db');


const RestaurantOwner = db.define('restaurantOwner', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  }
});

module.exports = RestaurantOwner;
