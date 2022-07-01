'use strict'

const {db, models: {User,
  Restaurant,
  Reservation,
  DiningTable,
  Cuisine,} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ firstName: 'cody', lastName: 'Smith', email: 'cody@gmail.com', password: '123', phone: '555-555-5555', role: 'restaurant' }),
    User.create({ firstName: 'murphy', lastName: 'Smith', email: 'murphy@gmail.com', password: '123', phone: '555-555-5555', role: 'restaurant' }),
    User.create({ firstName: 'cody2', lastName: 'Smith', email: 'cody2@gmail.com', password: '123', phone: '555-555-5555', role: 'customer' }),
    User.create({ firstName: 'murphy2', lastName: 'Smith', email: 'murphy2@gmail.com', password: '123', phone: '555-555-5555', role: 'customer' }),
  ])

  // Creating Restaurants
  const restaurants = await Promise.all([
    Restaurant.create({ name: 'test1',address: '123 FakeStreet', }),
    Restaurant.create({ name: 'test2',address: '123 FakeStreet',}),
  ])

  // Creating Dining Tables
  const diningTables = await Promise.all([
    DiningTable.create({ seats: 4, }),
    DiningTable.create({ seats: 4, }),
    DiningTable.create({ seats: 4, }),
    DiningTable.create({ seats: 7,}),
  ])

  // Adding Dining Tables to Restaurants
  await restaurants[0].addDiningTable(diningTables[0])
  await restaurants[0].addDiningTable(diningTables[1])
  await restaurants[1].addDiningTable(diningTables[2])
  await restaurants[1].addDiningTable(diningTables[3])


  // Adding Restuarants to Users
users.map(async (user, index) => await user.addRestaurant(restaurants[index]))
// await users[1].addReservation(booking);

// Creating Reservations
const res = await Reservation.create({ status: 'Booked', partySize: 4, userId: 3, restaurantId: 1, diningTableId: 2 })
const res2 = await Reservation.create({ status: 'WaitList', partySize: 4, userId: 4, restaurantId: 2, })
// Changing Occupied Dining Table status to Closed
await DiningTable.update(
  {status: 'Closed'},
{where:
{
  id: res.diningTableId
}}
)

// Creating Cuisines
const cuisines = await Promise.all([
  Cuisine.create({ type: 'pizza', }),
  Cuisine.create({ type: 'Latin',}),
  Cuisine.create({ type: 'Asian',}),
  Cuisine.create({ type: 'Indian',}),
  Cuisine.create({ type: 'Hamburgers',}),
  Cuisine.create({ type: 'Italian',}),
])

  // Adding Cuisine Filter Tags to Restaurants
  await restaurants[0].addCuisine(cuisines[0])
  await restaurants[0].addCuisine(cuisines[1])
  await restaurants[1].addCuisine(cuisines[0])
  await restaurants[0].addCuisine(cuisines[4])
  await restaurants[1].addCuisine(cuisines[4])
  await restaurants[0].addCuisine(cuisines[5])
  await restaurants[1].addCuisine(cuisines[5])
  await restaurants[1].addCuisine(cuisines[2])
  await restaurants[1].addCuisine(cuisines[3])

// const booking = await Reservation.create({ status: 'WaitList', partySize: 4, })
//  await booking.addRestaurant(restaurants[0]);
// booking.addRestaurant(restaurants[0]);

//  await booking.addUser(users[1])
// await users[1].addReservation(booking);



  // console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  // return {
  //   users: {
  //     cody: users[0],
  //     murphy: users[1]
  //   }
  // }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
