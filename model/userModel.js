import userModel from "../schema/userSchema.js";

export default createUser = (userObject) => {
  return userModel(userObject).save();
};
