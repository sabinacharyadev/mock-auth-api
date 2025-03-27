import sessionModel from "../schema/sessionSchema.js";

export const createSession = (sessionObject) => {
  return sessionModel(sessionObject).save();
};

export const deleteSession = (sessionObject) => {
  return sessionModel.findOneAndDelete(sessionObject);
};

export const findSession = (sessionObject) => {
  return sessionModel.findOne(sessionObject);
};
