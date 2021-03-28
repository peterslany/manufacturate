import { Db, MongoClient } from "mongodb";
import { Collection } from "../constants";
import { hashPassword } from "../utils";
import blogpostsSchema from "./schema/blogposts.json";
import changeRequestsSchema from "./schema/change_requests";
import ratingsSchema from "./schema/ratings";
import usersSchema from "./schema/users.json";

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

const insertAdminUser = async (db: Db) => {
  if (!(await db.collection(Collection.USERS).findOne({ _id: "admin" }))) {
    const hashedPassword = hashPassword("admin");
    await db.collection(Collection.USERS).insertOne({
      _id: "admin",
      isAdmin: true,
      passwordHash: hashedPassword,
      name: "Admininistrator",
    });
  }
};

// todo change to check if collection exists
async function initializeDb(db: Db) {
  // creates collections with validation schema
  try {
    await db.createCollection(Collection.BLOGPOSTS, {
      validator: {
        $jsonSchema: blogpostsSchema,
      },
    });
    await db.createCollection(Collection.CHANGE_REQUESTS, {
      validator: {
        $jsonSchema: changeRequestsSchema,
      },
    });
    await db.createCollection(Collection.RATINGS, {
      validator: {
        $jsonSchema: ratingsSchema,
      },
    });
    await db.createCollection(Collection.USERS, {
      validator: {
        $jsonSchema: usersSchema,
      },
    });
    // eslint-disable-next-line no-empty
  } catch {
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

  const client = await MongoClient.connect(uri as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = await client.db(dbName);

  if (!initialized) {
    initializeDb(db);
  }

  cachedClient = client;
  cachedDb = db;

  // if (!indexesCreated) {await createIndexes(db);}
  await insertAdminUser(db);

  return { client, db };
}
