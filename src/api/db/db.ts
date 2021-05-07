import { Db, MongoClient } from "mongodb";
import { Collection, ratingsSortableFields } from "../constants";
import { hashPassword } from "../utils";
import blogpostsSchema from "./schema/blogposts.json";
import changeRequestsSchema from "./schema/change_requests";
import ratingsSchema from "./schema/ratings";
import usersSchema from "./schema/users.json";

const uri: string | undefined = process.env.MONGODB_URI;
const dbName: string | undefined = process.env.MONGODB_DB_NAME;

let cachedClient: null | MongoClient = null;
let cachedDb: null | Db = null;

let indexesCreated = false;

let adminInserted = false;

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
  if (
    !(
      adminInserted ||
      (await db.collection(Collection.USERS).findOne({ _id: "admin" }))
    )
  ) {
    adminInserted = true;
    const hashedPassword = hashPassword("admin");
    try {
      await db.collection(Collection.USERS).insertOne({
        _id: "admin",
        isAdmin: true,
        passwordHash: hashedPassword,
        name: "Admininistrator",
      });
    } catch {
      adminInserted = false;
    }
  }
};

async function initializeDb(db: Db) {
  // creates collections with validation schema when the app is initialized
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
async function createIndexes(db: Db) {
  const ratingsIndexes = ratingsSortableFields;
  await Promise.all([
    db.collection(Collection.BLOGPOSTS).createIndex({ date: 1 }),
    db.collection(Collection.BLOGPOSTS).createIndex({ name: 1 }),
    ratingsIndexes.map((key: string) =>
      db.collection(Collection.RATINGS).createIndex({ [key]: 1 })
    ),
  ]);
  indexesCreated = true;
}

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

  const db = client.db(dbName);

  if (!initialized) {
    initializeDb(db);
  }

  cachedClient = client;
  cachedDb = db;

  if (!indexesCreated) {
    await createIndexes(db);
  }
  await insertAdminUser(db);

  return { client, db };
}
