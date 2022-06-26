const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
  // create user
  // @note: password will be hashed in the User model
  const user = await User.create({ ...req.body });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).send({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email & password');
  }
  // does user already exist
  const user = await User.findOne({ email });

  // compare password
  if (!user) {
    throw new UnauthenticatedError('Invalid User Credentials');
  }

  const isPasswordCorrect = await user.comparePWD(password);


  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Password');
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).send({ user: { name: user.name }, token });
};

module.exports = {
  registerController: register,
  loginController: login,
};
