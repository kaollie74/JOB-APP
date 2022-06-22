const express = require("express");
const authRouter = express.Router();

const {
    loginController,
    registerController,
} = require("../controllers/auth.controller");

// authRouter.route("/login").post(loginController);
// authRouter.route("/register").post(registerController);

authRouter.post('/login', loginController);
authRouter.post('/register', registerController);

module.exports = authRouter;
