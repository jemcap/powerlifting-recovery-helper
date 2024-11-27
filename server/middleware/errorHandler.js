const errorHandler = (error, req, res, next) => {
  if (error.name === "CastError") {
    res.status(400);
    throw new Error("Malformatted ID");
  }
  next(error);
};

export default errorHandler;
