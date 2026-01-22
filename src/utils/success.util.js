export const success = (res, status, data, message = null) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};
