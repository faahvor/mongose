import express from "express"
import dotenv from "dotenv"
import dbConnection from "./db/conn.js"

dotenv.config()
dbConnection()

const app = express()
const port = "4444"
app.use(express.json())

app.listen(port,()=>{
    console.log( `server is running on http://localhost:${port}`); 
})