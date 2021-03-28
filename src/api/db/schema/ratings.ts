import { productCategoryValues } from "../../../constants";

const ratingUnit = {
  bsonType: "object",
  required: ["total", "health", "ecology", "animals", "ethics", "description"],
  properties: {
    total: {
      bsonType: "number",
      minimum: 0,
      maximum: 10,
      description: "must be a number and is required",
    },
    health: {
      bsonType: "number",
      minimum: 0,
      maximum: 10,
      description: "must be a number and is required",
    },
    ecology: {
      bsonType: "number",
      minimum: 0,
      maximum: 10,
      description: "must be a number and is required",
    },
    animals: {
      bsonType: "number",
      minimum: 0,
      maximum: 10,
      description: "must be a number and is required",
    },
    ethics: {
      bsonType: "number",
      minimum: 0,
      maximum: 10,
      description: "must be a number and is required",
    },
    description: {
      bsonType: "object",
      required: ["sk", "en"],
      properties: {
        sk: {
          bsonType: "string",
          description: "must be a string",
        },
        en: {
          bsonType: "string",
          description: "must be a string",
        },
      },
      description:
        "must contain sk and en locales and is required for overall rating",
    },
  },
};

const schema = {
  bsonType: "object",
  required: ["_id", "name", "date", "rating", "subCategories", "authors"],
  properties: {
    _id: {
      bsonType: "string",
      description: "must be a string and is required",
    },
    name: {
      bsonType: "string",
      description: "must be a string and is required",
    },
    date: {
      bsonType: "string",
      description: "must be an ISOString date and is required",
    },
    rating: {
      bsonType: "object",
      required: ["overall", "subCategories"],
      properties: {
        overall: ratingUnit,
        subCategories: {
          bsonType: "object",
          properties: {
            ...productCategoryValues.reduce(
              (result, categoryName) => ({
                ...result,
                [categoryName]: ratingUnit,
              }),
              {}
            ),
          },
        },
      },
    },
    subCategories: {
      bsonType: "array",
      items: {
        enum: productCategoryValues,
      },
    },
    authors: {
      bsonType: "array",
      items: {
        bsonType: "string",
        description: "must be a string",
      },
    },
  },
};

export default schema;
