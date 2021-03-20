import { RatingCategory, RatingsSortFields } from "../../constants";

export const getRatingsFieldPath = (field: RatingsSortFields) => {
  switch (field) {
    case "manufacturer_name":
      return "name";
    case RatingCategory.ANIMALS:
      return "rating.overall.animals";
    case RatingCategory.ECOLOGY:
      return "rating.overall.ecology";
    case RatingCategory.ETHICS:
      return "rating.overall.ethics";
    case RatingCategory.HEALTH:
      return "rating.overall.health";
    case RatingCategory.TOTAL:
      return "rating.overall.total";
  }
};

// export const getLocaleFields = (collection: Collection, ) => {
//     switch(collection) {
//         case Collection.RATINGS:
//             switch
//     }
// }
