'use strict';

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
} = require('../server/db');
const { Op, col, where } = require('sequelize');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');
  // Creating Users

  //  const jordans = await Product.create({
  //   imageUrl: 'https://cdn.flightclub.com/1800/TEMPLATE/296982/1.jpg',
  //   name: 'Jordan 4 Retro Infrared',
  //   price: 172,
  //   availableSize: 7,
  //   description: 'Lorem Ipsum',
  // });

  const adminCody = await User.create({
    firstName: 'cody',
    lastName: 'Smith',
    email: 'cody@gmail.com',
    password: '123',
    phone: '555-555-5555',
    isAdmin: true,
  });
  const rOwnerMurphy = await User.create({
    firstName: 'murphy',
    lastName: 'Smith',
    email: 'murphy@gmail.com',
    password: '123',
    phone: '555-555-5555',
    isAdmin: false,
  });
  const customerCody = await User.create({
    firstName: 'cody2',
    lastName: 'Smith',
    email: 'cody2@gmail.com',
    password: '123',
    phone: '555-555-5555',
    isAdmin: false,
  });
  const customerMurphy = await User.create({
    firstName: 'murphy2',
    lastName: 'Smith',
    email: 'murphy2@gmail.com',
    password: '123',
    phone: '555-555-5555',
    isAdmin: false,
  });

  // Adding Restaurant Owners
  await adminCody.createRestaurantOwner();
  await rOwnerMurphy.createRestaurantOwner();

  let rOwners = await RestaurantOwner.findAll();

  // Creating Restaurants

  const restaurant1 = await Restaurant.create({
    name: 'Cipriani Downtown NYC',
    address: '376 West Broadway, New York',
    ratings: 4.2,
    priceLevel: 4,
    placeId: 'ChIJ71HLcIxZwokRXymDgawloWI',
    totalUserRatings: 848,
    imgUrl: `Aap_uECXQvo6mJkt2Sg5jssUMLwbv6I4o7pGbgpgH1Z9_KwJ1iaXGm1NkDx7hibj8i5KW7sm2td5MXmZ74jE2g8_nRsgwT0QypbkFP22OJz9DHkg7WXWLeO1LZlGSELqXFotTu9O81BcVeVOpC2wjoQE0_5hnrskU4pB-LqmWsfF3ajjY1Bu`,
    longitude: '-74.00295559999999',
    latitude: '40.7235595',
  });

  const restaurant2 = await Restaurant.create({
    name: 'Balthazar',
    address: '80 Spring Street, New York',
    ratings: 4.4,
    priceLevel: 3,
    placeId: 'ChIJt7fMLIlZwokRCRtM9bNDg78',
    totalUserRatings: 5425,
    imgUrl: `Aap_uEDo10UCVpVwHwT0wg6BjfzWU5R4ucS1K7CgTIQ8kuHWnGYo-XgJxZ4ZfvS-1XTWEuCGVbbmuNT644fJ_ZX6HP-VDHs5aMT_5jVgch_kjg2y9IRmrwXA-jSkcgue0FqwUFGKmaTtv_sS6_SPxrMOVL2pRRJmWmVCeIsNh3OdfdtMT6Iv`,
    longitude: '-73.99822979999999',
    latitude: '40.72266799999999',
  });
  const restaurant3 = await Restaurant.create({
    name: 'Macao Trading Company',
    address: '311 Church Street, New York',
    ratings: 4.5,
    priceLevel: 3,
    placeId: 'ChIJA9S9jIpZwokRZTF0bHWwXYU',
    totalUserRatings: 883,
    imgUrl: `Aap_uEBg-7TM4xB0-YbdPpGicoRmxWI1hDm6K6O01YCf-2B792T4PgK4tirpuWDCqQfzPJhWS410SGfr9-WhkBoz-wKxqV2F9L-Hoy6SNzhBOsTECvpiYRPeBIstkjP106iMWApaonF92NnUszhZL_Kq5h06qCe_pCZMS8mvzZ0x6i9-Ud1R`,
    longitude: '-73.99822979999999',
    latitude: '40.72266799999999',
  });
  const restaurant4 = await Restaurant.create({
    name: "Bubby's",
    address: '120 Hudson Street, New York',
    ratings: 4.4,
    priceLevel: 2,
    placeId: 'ChIJETquaPVZwokRVYYGSKrg4E0',
    totalUserRatings: 4721,
    imgUrl: `Aap_uED19lLOpd0kx0-5m3nw6ytKKzuczzdm7FY0UZzD_JRTtnHTLF7x_-COWiVfe2tTKQczt15HkkxutVgtGJ_avBq177biecg77XGgJPrJJQYXI74_zKO9MXMvePJlt6AHJVbGGSXLAAcgefyfOymk8g0XItbygRb5_6GgsyFP5kD5uEZ2`,
    longitude: '-74.0083829',
    latitude: '40.719819',
  });
  const restaurant5 = await Restaurant.create({
    name: 'Boqueria Soho',
    address: '171 Spring Street, New York',
    ratings: 4.4,
    priceLevel: 2,
    placeId: 'ChIJA914R4xZwokRzfeGqRbXLd4',
    totalUserRatings: 1642,
    imgUrl: `Aap_uEAEfCrOv_lmiLGjKKx21W890lTPURrOzk4S-k39zf22ivJRoua0Y4I0aK0Udp3ya6_xsQOYZRCa12lJZdFqudlb_8zijjg1VucU-R4TIKz7jk9253Sg6ncmOKL-v9JpfZ7npXEt80lhzSR7ULKaY99_Xy8D4DHSpugw24qXgMv21gsl`,
    longitude: '-74.00215539999999',
    latitude: '40.7249228',
  });
  const restaurant6 = await Restaurant.create({
    name: 'La Esquina',
    address: '114 Kenmare Street, New York',
    ratings: 4.2,
    priceLevel: 2,
    placeId: 'ChIJibtT3ohZwokR7tX0gp0nG8U',
    totalUserRatings: 2188,
    imgUrl:
      'Aap_uEDD7-cRm7aEYHHFFtyVBVUovdpmo6o5_X3bO5YNFKmmTk3JfCI-7O8-Q_btdo3GW059sX5Sy4v-Z-XD2Eplo_f6AIJi7qjU_-dj48y3BlAzlt2Hw1kcvnGkN5bTzEAzAF2IJ8lxt2Mc1BR5iv59xFXUB6PVtURXwDyvClyDw82vM4WH',
    longitude: -73.99756359999999,
    latitude: 40.7213879,
  });
  const restaurant7 = await Restaurant.create({
    address: '377 Greenwich Street, New York',
    imgUrl:
      'Aap_uECX3WpuQl5rP99HCe3dAdtVHaPYCOfVbB_xMvBsVV-P5BnIX3WmQtu2QwasKhUe8iIpwHSfS6DsVSE2cwv_WQGrRatjvYarJuByv0ZCGNdPy1Q90uwRmjxNcnQHUOf1_r2EEQ2u6CisU9ltxdH6FT-NTYDTTEgtfPrU79lNKsrfRLXF',
    latitude: 40.71984009999999,
    longitude: -74.00993439999999,
    name: 'Locanda Verde',
    placeId: 'ChIJTWkuhfVZwokRS_go-fdp7Vs',
    priceLevel: 3,
    ratings: 4.5,
    totalUserRatings: 1511,
  });
  const restaurant8 = await Restaurant.create({
    address: '375 Greenwich Street, New York',
    imgUrl:
      'Aap_uEAJp_qNjTuT3DrOAcYXk4zkPZ3OupjYbNZtFnrgzeqckCXT8Y1zUUA0BQjtrChBUsf5qZ-Qxmu1u52nN13LD3rcTkh9f5FI09fO_CgcBEnS064Lo9ZiNHSoWFg3e7vf9NUcfgxEXppHwO6BsvQDnLThCjlWJMzu9CI30BalTaA8pG3c',
    latitude: 40.7196368,
    longitude: -74.009776,
    name: 'Tribeca Grill',
    placeId: 'ChIJRzzoh_VZwokRdXF0AL5vPvA',
    priceLevel: 3,
    ratings: 4.1,
    totalUserRatings: 932,
  });
  const restaurant9 = await Restaurant.create({
    address: '9 Crosby Street, New York',
    imgUrl:
      'Aap_uEBAxl7D2xFIzqwzsHV6HM30l8hFq3G3ZmV4O__lETAa6fXwPdwSdkAyo_kx5gV-5apS53i9SF4m1PIblZ8jl6LFbgxGLr-znxIJNfYoBhUjumtdBDz_zHZLmFJsSltpmDlqHxZChRLirCNzZRx6OmZMr9qmPdaU0A_J9u2xtyJNrw60',
    latitude: 40.71981419999999,
    longitude: -74.00007339999999,
    name: 'NOMO SOHO',
    placeId: 'ChIJM8mGj4lZwokRSbZBvNOVNKM',
    priceLevel: 3,
    ratings: 4.1,
    totalUserRatings: 1369,
  });
  const restaurant10 = await Restaurant.create({
    address: '131 Sullivan Street, New York',
    imgUrl:
      'Aap_uEBFmXkzT3esdOqUokUJN1bXtlzvtYrHb8K_LaUeh0-XNZmRsO5y5Z_XRC_FZsOUuDpenlV11qHE5GvI4Pe-tgBFPKBQ16Sl0Or6Bw_qVBLp7z6tsXWNB85_HKcL351lz8Fzo7kaJukP1Cx-9M_2HIIN737EZfk8iSFNVcVFFPx2gue0',
    latitude: 40.72653280000001,
    longitude: -74.0021536,
    name: 'The Dutch',
    placeId: 'ChIJ3RB9uI1ZwokRxCJXW-HpYZI',
    priceLevel: 3,
    ratings: 4.3,
    totalUserRatings: 1703,
  });

  const restaurants = [
    restaurant1,
    restaurant2,
    restaurant3,
    restaurant4,
    restaurant5,
    restaurant6,
    restaurant7,
    restaurant8,
    restaurant9,
    restaurant10,
  ];

  // Adding Restaurant Availibility

  await restaurant1.createRestaurantAvailability({
    day: 'Sunday',
    openingTime: '9:00:00',
    closingTime: '17:00:00',
  });

  await restaurant1.createRestaurantAvailability({
    day: 'Monday',
    openingTime: '9:00:00',
    closingTime: '17:00:00',
  });

  await restaurant1.createRestaurantAvailability({
    day: 'Tuesday',
    openingTime: '9:00:00',
    closingTime: '17:00:00',
  });

  await restaurant1.createRestaurantAvailability({
    day: 'Wednesday',
    openingTime: '9:00:00',
    closingTime: '17:00:00',
  });

  await restaurant1.createRestaurantAvailability({
    day: 'Thursday',
    openingTime: '9:00:00',
    closingTime: '17:00:00',
  });

  await restaurant1.createRestaurantAvailability({
    day: 'Friday',
    openingTime: '9:00:00',
    closingTime: '17:00:00',
  });

  await restaurant1.createRestaurantAvailability({
    day: 'Saturday',
    openingTime: '9:00:00',
    closingTime: '17:00:00',
  });

  await restaurant2.createRestaurantAvailability({
    day: 'Sunday',
    openingTime: '11:00:00',
    closingTime: '23:00:00',
  });

  await restaurant2.createRestaurantAvailability({
    day: 'Tuesday',
    openingTime: '11:00:00',
    closingTime: '23:00:00',
  });

  await restaurant2.createRestaurantAvailability({
    day: 'Thursday',
    openingTime: '11:00:00',
    closingTime: '23:00:00',
  });

  await restaurant2.createRestaurantAvailability({
    day: 'Friday',
    openingTime: '11:00:00',
    closingTime: '23:00:00',
  });

  await restaurant2.createRestaurantAvailability({
    day: 'Saturday',
    openingTime: '11:00:00',
    closingTime: '23:00:00',
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

for(let i =0; i< restaurants.length; i++){
 let DT1 = await DiningTable.create({ seats: Math.floor(Math.random() * (12 - 2 + 1)) + 2 })
 let DT2 = await DiningTable.create({ seats: Math.floor(Math.random() * (12 - 2 + 1)) + 2 })
 let DT3 = await DiningTable.create({ seats: Math.floor(Math.random() * (12 - 2 + 1)) + 2 })
 let DT4 = await DiningTable.create({ seats: Math.floor(Math.random() * (12 - 2 + 1)) + 2 })
 let DT5 = await DiningTable.create({ seats: Math.floor(Math.random() * (12 - 2 + 1)) + 2 })

  await restaurants[i].addDiningTable(DT1);
  await restaurants[i].addDiningTable(DT2);
  await restaurants[i].addDiningTable(DT3);
  await restaurants[i].addDiningTable(DT4);
  await restaurants[i].addDiningTable(DT5);
}

  await restaurant1.addDiningTable(r1DT1);
  await restaurant1.addDiningTable(r1DT2);
  await restaurant2.addDiningTable(r2DT1);
  await restaurant2.addDiningTable(r2DT2);

  // Creating Cuisines
  const cuisines = await Promise.all([
    Cuisine.create({ type: 'pizza' }),
    Cuisine.create({ type: 'Latin' }),
    Cuisine.create({ type: 'Asian' }),
    Cuisine.create({ type: 'Indian' }),
    Cuisine.create({ type: 'Hamburgers' }),
    Cuisine.create({ type: 'Italian' }),
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
  restaurants.map(async (r, index) => {
    if (index % 2 === 0) {
      await rOwners[1].addRestaurant(restaurants[index]);
    } else {
      await rOwners[0].addRestaurant(restaurants[index]);
    }
  });
  // rOwners.map(
  //   async (owner, index) => await owner.addRestaurant(restaurants[index])
  // );

  // Creating Reservations

  // customer Cody successfully books a reservation at restuarant1 at a table of 4
  const cCodyRes = await customerCody.createReservation({
    status: 'Booked',
    partySize: 4,
  });
  await cCodyRes.setRestaurant(restaurant1);
  await cCodyRes.addDiningTable(r1DT1);

  // Customer Murphy wants to book a table at restaurant2, but has to wait for a table to free up
  const cMurphyRes = await customerMurphy.createReservation({
    status: 'WaitList',
    partySize: 6,
  });
  await cMurphyRes.setRestaurant(restaurant2);

  // await cMurphyRes.update({ status: "Booked" });

  // await cMurphyRes.addDiningTable(r2DT2);

  // Admin Cody will book a table for a party of 7 at restaurant2 successfuilly
  // (reserves dining table 2 at restaurant2), then leaves, freeing the table
  const aCodyRes = await adminCody.createReservation({
    status: 'Booked',
    partySize: 7,
  });
  await aCodyRes.setRestaurant(restaurant2);
  await aCodyRes.addDiningTable(r2DT2);
  let bookedSeatings = await ReservedSeating.findAll();
  // should show 2 entries
  // console.log(`Booked seats Before Admin Cody leaves: `, bookedSeatings.length);

  // Admin Cody's Table is now freed up
  await aCodyRes.update({ status: 'Completed' });
  await ReservedSeating.destroy({
    where: {
      reservationId: aCodyRes.id,
    },
  });
  bookedSeatings = await ReservedSeating.findAll();

  // should show 1 entry
  // console.log(`Booked seats after Admin Cody Left: `, bookedSeatings.length);

  // App will pull up available Dining Tables from restuarant1 that Users can book
  const openDiningTables = await DiningTable.findAll({
    where: {
      restaurantId: restaurant2.id,
      isOccupied: false,
      '$reservations.reservedSeating.diningTableId$': { [Op.eq]: null },
    },
    include: [
      {
        model: Reservation,
      },
    ],
  });
  // console.log(JSON.stringify(openDiningTables, null, 2));
  // console.log(await ReservedSeating.findAll({include: [DiningTable]}))
  // console.log(Object.keys(Restaurant.prototype))

  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
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
