const router = require("express").Router();
const axios = require("axios");
module.exports = router;
require("dotenv").config();

router.get("/", async (req, res, next) => {
  try {
    // const lat = req.body.lat
    // const long = req.body.long

    const lat = 40.714184;
    const long = -74.006238;
    const radius = 1609;
    let config = {
      method: "get",
      url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${long}&radius=${radius}&type=restaurant&key=${process.env.API_KEY}`,
      headers: {},
    };
    const { data } = await axios(config);

    const maps = data.results.map((restaurant) => {
      return {
        name: restaurant.name,
        address: restaurant.vicinity,
        ratings: restaurant.rating,
        priceLevel: restaurant.price_level,
        placeId: restaurant.place_id,
        totalUserRatings: restaurant.user_ratings_total,
        imgUrl: restaurant.photos[0].photo_reference,
        longitude: restaurant.geometry.location.lng,
        latitude: restaurant.geometry.location.lat,
      };
    });
    res.json(maps);
    // res.json(data.results);
  } catch (err) {
    next(err);
  }
});
