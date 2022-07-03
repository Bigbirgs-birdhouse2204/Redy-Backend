const Sequelize = require('sequelize');
const db = require('../db');


const RestaurantAvailability = db.define('restaurantAvailability', {
  day: {
    type: Sequelize.ENUM(
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ),
    allowNull: false,
  },
  openingTime: {
    type: Sequelize.TIME,
    allowNull: false,
    // set (valueToBeSet) {
    //     this.setDataValue('openingTime', valueToBeSet)
    // }
  },
  closingTime: {
    type: Sequelize.TIME,
    allowNull: false,
    // set (valueToBeSet) {
    //     this.setDataValue('closingTime', valueToBeSet)
    // }
  },

});

module.exports = RestaurantAvailability;
