const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mongoDB = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch( (err) => {
        console.log(err);
    });


async function main() {
    await mongoose.connect(mongoDB);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: '66b5233467f15066b1c68cad'}));
    await Listing.insertMany(initData.data);
    console.log("Data is initialized");
}

initDB();
