import sessionModel from "../schema/sessionSchema.js";

export const createSession = (sessionObject) => {
  return sessionModel(sessionObject).save();
};
