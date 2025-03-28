import jwt from "jsonwebtoken";

const generateAccessToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
};

export const generateJWT = (email) => {
  return {
    accessToken: generateAccessToken(email),
    refreshToken: generateRefreshToken(email),
  };
};

export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (error) {
    return {
      message: error.message,
    };
  }
};

export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    return {
      message: error.message,
    };
  }
};
