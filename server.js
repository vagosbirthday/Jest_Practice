// db.helper.js
const mongoose = require("mongoose");
require("dotenv").config();

const connectToDatabase = async () => {
  try {
    //const connectionString = `mongodb://${
    // dbUsername}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`;

    const connectionString = process.env.MONGODB_URI;

    // https://www.mongodb.com/resources/languages/express-mongodb-rest-api-tutorial

    // const client = new MongoClient(connectionString);
    // let conn;
    // try {
    // conn = await client.connect();
    // } catch(e) {
    // console.error(e);
    // }
    // let db = conn.db("sample_training");

    // Connect to MongoDB
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if the connection fails
  }
};

module.exports = connectToDatabase;
