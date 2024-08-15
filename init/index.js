if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
  }

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

const mongoDB = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(mongoDB);
}

const initDB = async () => {  
  await Listing.deleteMany({});

  console.log("Initializing data...");
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "66b5233467f15066b1c68cad",
  }));

  for (listing of initData.data) {
    let response = await geocodingClient
      .forwardGeocode({
        query: listing.location,
        limit: 1,
      })
      .send();

    listing.geometry = response.body.features[0].geometry;
  }

  await Listing.insertMany(initData.data);
  console.log("Data is initialized");
};

initDB();
