export const successResponse = (res, data, message) => {
  return res.json({
    status: "success",
    data,
    message,
  });
};

export const errorResponse = (res, message) => {
  return res.json({
    status: "error",
    message,
  });
};
