import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;

const client = new MongoClient(MONGODB_URI);

let db;

async function mongoConnect() {
  try {
    const mongo = await client.connect();
    console.log("Connection To MongoDB Database Successful");
    db = mongo.db(DB_NAME);
  } catch (error) {
    console.error(error);
    process.exit(1);
 }
}

export { mongoConnect, db };