const { StatusCodes } = require('http-status-codes');
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something wend wrong, try again later'
  };


  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((el) => el.message)
      .join(', ');
    customError.statusCode = 400;
  }

  if(err.name === 'CastError'){
    customError.statusCode = StatusCodes.NOT_FOUND;
    customError.msg = `No item found with id: ${err.value}`;
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value for ${Object.keys(err.keyValue)} field, please choose another email`;
    customError.statusCode = StatusCodes.BadRequestError;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
