const express = require("express");
const authRouter = express.Router();

const {
    loginController,
    registerController,
} = require("../controllers/auth.controller");

authRouter.post('/login', loginController);
authRouter.post('/register', registerController);

module.exports = authRouter;
