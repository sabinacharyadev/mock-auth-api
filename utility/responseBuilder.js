export const successResponse = (res, data, message) => {
  res.json({
    status: "success",
    data,
    message,
  });
};

export const errorResponse = (res, message) => {
  res.json({
    status: "error",
    message,
  });
};
