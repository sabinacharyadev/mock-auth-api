import sessionModel from "../schema/sessionSchema.js";

export const createSession = (sessionObject) => {
  return sessionModel(sessionObject).save();
};

export const deleteSession = (sessionObject) => {
  return sessionModel.findOneAndDelete(sessionObject);
};
