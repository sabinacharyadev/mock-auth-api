import userModel from "../schema/userSchema.js";

export const createUser = (userObject) => {
  return userModel(userObject).save();
};

export const findUserByEmail = (email) => {
  return userModel.find(email);
};

export const updateUser = (userId) => {
  return userModel.findOneAndUpdate(userId, { isVerified: true });
};
