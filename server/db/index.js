//this is the access point for all things database related!

const db = require('./db')
const Cuisine = require('./models/Cuisine')
const DiningTable = require('./models/DiningTable')
const Reservation = require('./models/Reservation')
const ReservedSeating = require('./models/ReservedSeating')
const Restaurant = require('./models/Restaurant')
const RestaurantOwner = require('./models/RestaurantOwner')
const User = require('./models/User')


//associations could go here!

// User & Restaurant Owner O-O
User.hasOne(RestaurantOwner);
RestaurantOwner.belongsTo(User);

// Restaurant & Dining Table  O-M
Restaurant.hasMany(DiningTable);
DiningTable.belongsTo(Restaurant);

// Restaurant Owner & Restaurant O-M
RestaurantOwner.hasMany(Restaurant, { foreignKey: 'ownerId' });
Restaurant.belongsTo(RestaurantOwner, { foreignKey: 'ownerId' });

// Cuisine Tags Restaurant M-M Table
Cuisine.belongsToMany(Restaurant, {through: 'CuisineTags'})
Restaurant.belongsToMany(Cuisine, {through: 'CuisineTags'})

// User & Restaurant M-M Table Through Reservation
User.belongsToMany(Restaurant, { through: Reservation });
Restaurant.belongsToMany(User, { through: Reservation });
Reservation.belongsTo(User);
Reservation.belongsTo(Restaurant);
User.hasMany(Reservation);
Restaurant.hasMany(Reservation);



// Reservation & Dining Table M-M Table Through Reserved Seating
// Reservation.belongsToMany(DiningTable, { through: ReservedSeating });
// Reservation.belongsTo(DiningTable, { through: ReservedSeating,
//   // foreignKey: 'reservationId',
//   // primaryKey: Reservation.id
// });
DiningTable.belongsToMany(Reservation, { through: ReservedSeating });
Reservation.belongsToMany(DiningTable, { through: ReservedSeating });

// Restaurant.belongsToMany(Reservation, { through: Reservation });
// Restaurant.hasMany(Reservation);
// Reservation.belongsTo(Restaurant);
// User.hasMany(Reservation);
// Reservation.belongsTo(User);
// DiningTable.hasMany(Reservation,
// //   {
// //   foreignKey: {
// //     name: 'diningTableId'
// //   }
// // }
// );
// Reservation.belongsTo(DiningTable,
//   {
//     foreignKey: {
//       name: 'diningTableId'
//     }
//   }
//   );


module.exports = {
  db,
  models: {
    Cuisine,
    DiningTable,
    Reservation,
    ReservedSeating,
    Restaurant,
    RestaurantOwner,
    User,
  },
}
