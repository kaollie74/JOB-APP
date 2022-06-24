const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

const register = async (req, res) => {
    // create user
    // @note: password will be hashed in the User model
    const user = await User.create({ ...req.body });
    res.status(StatusCodes.CREATED).send({ user });
};

const login = async (req, res) => {
    res.send("login user");
};

module.exports = {
    registerController: register,
    loginController: login,
};
