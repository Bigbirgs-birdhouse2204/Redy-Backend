const Sequelize = require('sequelize');
const db = require('../db');


const ReservedSeating = db.define('reservedSeating', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  }
  // type: {
  //   type: Sequelize.STRING,
  //   allowNull: false,
  //   validate: {
  //     len: 1,
  //   },
  // },
});

module.exports = ReservedSeating;
