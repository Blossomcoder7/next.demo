import ClientModel from "@/_models/users/client/Client";
import UserModel from "@/_models/users/user/User";

/**
 * Given a model name, returns the corresponding mongoose model.
 * @param name name of the model
 * @returns mongoose model
 */
export const getModelByName = (name: "user" | "client") => {
  switch (name) {
    case "user":
      return UserModel;

    case "client":
      return ClientModel;

    default:
      return null;
  }
};
