import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import  colors  from "colors";
import connectDB from "./config/db.js";
// Load env variables
import UserRouter from './Routers/UserRouter.js'

dotenv.config();
connectDB();

const app = express();

app.use(express.json())
app.use(cors());

app.get('/',(req,res)=>{
  res.json({code:200, remark:'success',data:null})
})

app.use('/users',UserRouter)

const PORT =5000;
app.listen(PORT,()=>{
  console.log(`Server is runnig on http://localhost:${PORT}`);
})