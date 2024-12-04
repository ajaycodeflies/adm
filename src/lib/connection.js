import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" }); // Ensure to load the .env.local file


const { MONGODB_USERNAME: username, MONGODB_PASSWORD: password } = process.env;

if (!username || !password) {
  process.exit(1);
}

const connectionStr = `mongodb+srv://${username}:${password}@cluster0.wd3jw.mongodb.net/admDigital?retryWrites=true&w=majority&appName=Cluster0`;

console.log("MongoDB Connection String:", connectionStr);

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(connectionStr);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;
