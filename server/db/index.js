//this is the access point for all things database related!

const db = require('./db')
const Cuisine = require('./models/Cuisine')
const DiningTable = require('./models/DiningTable')
const Reservation = require('./models/Reservation')
const Restaurant = require('./models/Restaurant')
const User = require('./models/User')


//associations could go here!

// Restaurant & Dining Table  O-M
Restaurant.hasMany(DiningTable);
DiningTable.belongsTo(Restaurant);

// User & Restaurant O-M
User.hasMany(Restaurant);
Restaurant.belongsTo(User);

// Reservation Associations via Super Many-to-Many relationship
User.belongsToMany(DiningTable, { through: Reservation });
DiningTable.belongsToMany(User, { through: Reservation });
// Restaurant.belongsToMany(Reservation, { through: Reservation });
Restaurant.hasMany(Reservation);
Reservation.belongsTo(Restaurant);
User.hasMany(Reservation);
Reservation.belongsTo(User);
DiningTable.hasMany(Reservation,
//   {
//   foreignKey: {
//     name: 'diningTableId'
//   }
// }
);
Reservation.belongsTo(DiningTable,
  {
    foreignKey: {
      name: 'diningTableId'
    }
  }
  );

// Filter Table
Cuisine.belongsToMany(Restaurant, {through: 'Filter'})
Restaurant.belongsToMany(Cuisine, {through: 'Filter'})

module.exports = {
  db,
  models: {
    User,
    Restaurant,
    Reservation,
    DiningTable,
    Cuisine,
  },
}
