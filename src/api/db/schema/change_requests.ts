import blogpostsSchema from "./blogposts.json";
import ratingsSchema from "./ratings.json";

export default {
  bsonType: "object",
  required: ["author", "date", "newValue", "type"],
  properties: {
    author: {
      bsonType: "string",
      description: "must be a string and is required",
    },
    date: {
      bsonType: "date",
      description: "must be a date and is required",
    },
    newValue: {
      anyOf: [ratingsSchema, blogpostsSchema],
      description:
        "is object with schema of rating or blogpost and is required",
    },
    note: {
      bsonType: "string",
      description: "must be a string",
    },
    type: {
      enum: ["rating", "blogpost"],
      description:
        "must be one of the values [rating] or  [blogpost] and is required",
    },
  },
};
