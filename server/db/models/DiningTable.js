const Sequelize = require('sequelize');
const db = require('../db');


const DiningTable = db.define('diningTable', {
  status: {
    type: Sequelize.DataTypes.ENUM('Open', 'Closed'),
    defaultValue: 'Open',
  },
  seats: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      len: 1,
    },
  },
});

module.exports = DiningTable;
