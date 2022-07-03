"use strict";

const {
  db,
  models: {
    Cuisine,
    DiningTable,
    Reservation,
    ReservedSeating,
    Restaurant,
    RestaurantAvailability,
    RestaurantOwner,
    User,
  },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      firstName: "cody",
      lastName: "Smith",
      email: "cody@gmail.com",
      password: "123",
      phone: "555-555-5555",
      isAdmin: true,
    }),
    User.create({
      firstName: "murphy",
      lastName: "Smith",
      email: "murphy@gmail.com",
      password: "123",
      phone: "555-555-5555",
      isAdmin: false,
    }),
    User.create({
      firstName: "cody2",
      lastName: "Smith",
      email: "cody2@gmail.com",
      password: "123",
      phone: "555-555-5555",
      isAdmin: false,
    }),
    User.create({
      firstName: "murphy2",
      lastName: "Smith",
      email: "murphy2@gmail.com",
      password: "123",
      phone: "555-555-5555",
      isAdmin: false,
    }),
  ]);
  const adminCody = users[0];
  const rOwnerMurphy = users[1];
  const customerCody = users[2];
  const customerMurphy = users[3];

  // Adding Restaurant Owners

  await adminCody.createRestaurantOwner();
  await rOwnerMurphy.createRestaurantOwner();

  let rOwners = await RestaurantOwner.findAll();

  // Creating Restaurants
  const restaurants = await Promise.all([
    Restaurant.create({ name: "test1", address: "123 FakeStreet" }),
    Restaurant.create({ name: "test2", address: "123 FakeStreet" }),
  ]);
  const restaurant1 = restaurants[0];
  const restaurant2 = restaurants[1];

  // Adding Restaurant Availibility
  // console.log(Object.keys(Restaurant.prototype))
  await restaurant1.createRestaurantAvailability({
    day: "Sunday",
    openingTime: "9:00:00",
    closingTime: "17:00:00",
  });

  await restaurant1.createRestaurantAvailability({
    day: "Monday",
    openingTime: "9:00:00",
    closingTime: "17:00:00",
  });

  await restaurant1.createRestaurantAvailability({
    day: "Tuesday",
    openingTime: "9:00:00",
    closingTime: "17:00:00",
  });

  await restaurant1.createRestaurantAvailability({
    day: "Wednesday",
    openingTime: "9:00:00",
    closingTime: "17:00:00",
  });

  await restaurant1.createRestaurantAvailability({
    day: "Thursday",
    openingTime: "9:00:00",
    closingTime: "17:00:00",
  });

  await restaurant1.createRestaurantAvailability({
    day: "Friday",
    openingTime: "9:00:00",
    closingTime: "17:00:00",
  });

  await restaurant1.createRestaurantAvailability({
    day: "Saturday",
    openingTime: "9:00:00",
    closingTime: "17:00:00",
  });

  await restaurant2.createRestaurantAvailability({
    day: "Sunday",
    openingTime: "11:00:00",
    closingTime: "23:00:00",
  });


  await restaurant2.createRestaurantAvailability({
    day: "Tuesday",
    openingTime: "11:00:00",
    closingTime: "23:00:00",
  });


  await restaurant2.createRestaurantAvailability({
    day: "Thursday",
    openingTime: "11:00:00",
    closingTime: "23:00:00",
  });

  await restaurant2.createRestaurantAvailability({
    day: "Friday",
    openingTime: "11:00:00",
    closingTime: "23:00:00",
  });

  await restaurant2.createRestaurantAvailability({
    day: "Saturday",
    openingTime: "11:00:00",
    closingTime: "23:00:00",
  });

  // Creating Dining Tables
  const diningTables = await Promise.all([
    DiningTable.create({ seats: 4 }),
    DiningTable.create({ seats: 4 }),
    DiningTable.create({ seats: 4 }),
    DiningTable.create({ seats: 7 }),
  ]);
  const r1DT1 = diningTables[0];
  const r1DT2 = diningTables[1];
  const r2DT1 = diningTables[2];
  const r2DT2 = diningTables[3];

  // Adding Dining Tables to Restaurants
  await restaurant1.addDiningTable(r1DT1);
  await restaurant1.addDiningTable(r1DT2);
  await restaurant2.addDiningTable(r2DT1);
  await restaurant2.addDiningTable(r2DT2);

  // Creating Cuisines
  const cuisines = await Promise.all([
    Cuisine.create({ type: "pizza" }),
    Cuisine.create({ type: "Latin" }),
    Cuisine.create({ type: "Asian" }),
    Cuisine.create({ type: "Indian" }),
    Cuisine.create({ type: "Hamburgers" }),
    Cuisine.create({ type: "Italian" }),
  ]);
  const pizza = cuisines[0];
  const latin = cuisines[1];
  const asian = cuisines[2];
  const indian = cuisines[3];
  const hamburgers = cuisines[4];
  const italian = cuisines[5];

  // Adding Cuisine Filter Tags to Restaurants
  await restaurant1.addCuisine(pizza);
  await restaurant1.addCuisine(latin);
  await restaurant2.addCuisine(pizza);
  await restaurant1.addCuisine(hamburgers);
  await restaurant2.addCuisine(hamburgers);
  await restaurant1.addCuisine(italian);
  await restaurant2.addCuisine(italian);
  await restaurant2.addCuisine(asian);
  await restaurant2.addCuisine(indian);

  // Adding Restuarants to Restaurant Owners
  rOwners.map(
    async (owner, index) => await owner.addRestaurant(restaurants[index])
  );

  // Creating Reservations

  // customer Cody successfully books a reservation at restuarant1 at a table of 4
  const cCodyRes = await customerCody.createReservation({
    status: "Booked",
    partySize: 4,
  });
  await cCodyRes.setRestaurant(restaurant1);
  await cCodyRes.addDiningTable(r1DT1);

  // console.log(cCodyRes);

  // Customer Murphy wants to book a table at restaurant2, but has to wait for a table to free up
  const cMurphyRes = await customerMurphy.createReservation({
    status: "WaitList",
    partySize: 6,
  });
  await cMurphyRes.setRestaurant(restaurant2);
  // console.log(cMurphyRes);

  // Admin Cody will book a table for a party of 7 at restaurant2 successfuilly
  // (reserves dining table 2 at restaurant2), then leaves, freeing the table
  const aCodyRes = await adminCody.createReservation({
    status: "Booked",
    partySize: 7,
  });
  await aCodyRes.setRestaurant(restaurant2);
  await aCodyRes.addDiningTable(r2DT2);
  let bookedSeatings = await ReservedSeating.findAll();
  // should show 2 entries
  console.log(`Booked seats Before Admin Cody leaves: `, bookedSeatings.length);
  // Admin Cody's Table is now freed up
  await aCodyRes.update({ status: "Completed" });
  await ReservedSeating.destroy({
    where: {
      reservationId: aCodyRes.id,
    },
  });
  bookedSeatings = await ReservedSeating.findAll();

  // should show 1 entry
  console.log(`Booked seats after Admin Cody Left: `, bookedSeatings.length);

  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
