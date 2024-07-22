import express from "express"
import { changePassword, createUser, forgetPassword, getAllUsers, userLogin } from "../controllers/userController.js"
import { verifyJWToken } from "../middleWares/jwtAuth.js"


const router = express.Router()

router.post("/register",createUser)
router.post("/login",userLogin)
router.patch("/change-password/:userName",changePassword)
router.patch("/forget-password",forgetPassword)
router.get("/all",verifyJWToken, getAllUsers)


export default router 