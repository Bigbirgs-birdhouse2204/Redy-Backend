const Sequelize = require('sequelize');
const db = require('../db');


const Reservation = db.define('reservation', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  status: {
    type: Sequelize.DataTypes.ENUM('Booked', 'Completed', 'NoShow', 'WaitList', 'Cancelled', 'Pending'),
    defaultValue: 'Pending',
  },
  partySize: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      len: 1,
    },
  },
  // diningTableId: {
  //   type: Sequelize.INTEGER,
  //   // in cases where a user is on a wait list
  //   allowNull: true,
  // }
});

module.exports = Reservation;
