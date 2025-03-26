import bcrypt from "bcryptjs";

const SALT = 10;
export const hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, SALT);
};

export const comparePassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};
