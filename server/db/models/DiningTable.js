const Sequelize = require('sequelize');
const db = require('../db');


const DiningTable = db.define('diningTable', {
  // isOccupied: {
  //   type: Sequelize.BOOLEAN,
  //   // seat is open by default
  //   defaultValue: false,
  // },
  seats: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = DiningTable;
