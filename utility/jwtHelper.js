import jwt from "jsonwebtoken";

const generateAccessToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "1m",
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

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (error) {
    return {
      message: error.message,
    };
  }
};
