import express from "express";
const router = express.Router();
import UserController from "../controllers/userController.js";
import checkUserAuth from "../middlewares/auth-middleware.js";

// ROute Level Middleware - To Protect Route
// router.use('/changepassword', checkUserAuth)

// Public Routes
router.post("/register", UserController.userRegistration);
router.post("/login", UserController.userLogin);

// Protected Routes

export default router;
