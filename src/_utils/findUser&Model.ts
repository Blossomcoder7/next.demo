import ClientModel from "@/_models/users/client/Client";
import UserModel from "@/_models/users/user/User";
export default async function findUserAndModel(email: string) {
  try {
    const isUser = await UserModel.findOne({ email: email });
    const isClient = await ClientModel.findOne({ email: email });
    if (isUser) {
      return {
        model: UserModel,
        data: isUser.toObject(),
      };
    } else if (isClient) {
      return { model: isClient, data: isClient.toObject() };
    } else {
      return null;
    }
  } catch (error) {
    console.log({ error });
    return null;
  }
}
