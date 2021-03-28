import { RatingCategory } from "../../constants";
import { RatingsSortableFields, User, UserDB } from "../../types";

export const getRatingsFieldPath = (field: RatingsSortableFields): string => {
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
    default:
    case RatingCategory.TOTAL:
      return "rating.overall.total";
  }
};

export const dbUserToUser = ({ _id, name, isAdmin }: UserDB): User => ({
  username: _id,
  name,
  isAdmin,
});
