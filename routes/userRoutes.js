import express from "express"
import { changePassword, changeUsername, createUser,  getAllUsers, sendOtp, userLogin } from "../controllers/userController.js"
import { verifyJWToken } from "../middleWares/jwtAuth.js"


const router = express.Router()

router.post("/register",createUser)
router.post("/login",userLogin)
router.patch("/change-password/:userName",verifyJWToken,changePassword)
router.patch("/changeUserName/:userName",verifyJWToken,changeUsername)
router.patch("/send-otp",sendOtp)
router.get("/all",verifyJWToken, getAllUsers)
changeUsername

export default router 