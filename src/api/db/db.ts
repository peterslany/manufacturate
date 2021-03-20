/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { Db, MongoClient } from "mongodb";
import ratingsSchema from "./schema/ratings.json";

const uri: string | undefined = process.env.MONGODB_URI;
const dbName: string | undefined = process.env.MONGODB_DB_NAME;

let cachedClient: null | MongoClient = null;
let cachedDb: null | Db = null;

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

if (!dbName) {
  throw new Error(
    "Please define the MONGODB_DB environment variable inside .env.local"
  );
}

let initialized = false;

async function initializeDb(db: Db) {
  // creates collections with validation schema
  try {
    db.createCollection("ratings", {
      validator: {
        $jsonSchema: ratingsSchema,
      },
      validationAction: "warn",
    });
  } catch (err) {
    console.log(err);
  } finally {
    initialized = true;
  }
}

// TODO: create indices on RatingsSortFields here
// const indexesCreated = false;

// async function createIndexes(db: Db) {
//   const indices = ratingsSortableFields;
//   //   await Promise.all([
//   //     db
//   //       .collection("tokens")
//   //       .createIndex({ expireAt: -1 }, { expireAfterSeconds: 0 }),
//   //     db.collection("posts").createIndex({ createdAt: -1 }),
//   //     db.collection("users").createIndex({ email: 1 }, { unique: true }),
//   //   ]);
//   console.log("\nINDEXING\n");
//   indexesCreated = true;
// }

export default async function database(): Promise<{
  client: MongoClient;
  db: Db;
}> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }
  console.log("UNCACHED");

  const client = await MongoClient.connect(uri as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = await client.db(dbName);

  if (!initialized) initializeDb(db);

  cachedClient = client;
  cachedDb = db;

  // if (!indexesCreated) await createIndexes(db);

  return { client, db };
}