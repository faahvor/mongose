import express from "express";
import {
  changePassword,
  changeUsername,
  createUser,
  getAllUsers,
  loginOtp,
  sendOtp,
  updatePasswordOtp,
  userLogin,
} from "../controllers/userController.js";
import { verifyJWToken } from "../middleWares/jwtAuth.js";
import { validateOtp } from "../middleWares/validateOtp.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", userLogin);
router.patch("/change-password/:userName", verifyJWToken, changePassword);
router.patch("/changeUserName/:userName", verifyJWToken, changeUsername);
router.patch("/send-otp", sendOtp);
router.post("/login-otp", validateOtp, loginOtp);
router.patch("/forget_password/:email", verifyJWToken, updatePasswordOtp);
router.get("/all", getAllUsers);
changeUsername;

export default router;
