import express from "express"
import dotenv from "dotenv"
import dbConnection from "./db/conn.js"
import cors from "cors"
import userRouter from "./routes/userRoutes.js"

dotenv.config()

await dbConnection()
const app = express()
const port = "3000"
app.use(express.json())
app.use(cors())
app.use("/api/v1/user", userRouter)

app.listen(port,()=>{
    console.log( `server is running on http://localhost:${port}`); 
})