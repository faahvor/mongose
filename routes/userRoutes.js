import express from "express"
import { createUser, getAllUsers, userLogin } from "../controllers/userController.js"
import { verifyJWToken } from "../middleWares/jwtAuth.js"


const router = express.Router()

router.post("/register",createUser)
router.post("/login",userLogin)
router.get("/all",verifyJWToken, getAllUsers)


export default router