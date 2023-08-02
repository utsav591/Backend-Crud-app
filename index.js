import express from "express";
import cors from "cors";
import dotenv from "dotenv"

//Import Router
import UserRouter from './Routers/UserRouter.js'

const app =express();

dotenv.config();

app.use(cors());

app.get('/',(req,res)=>{
  res.json({code:200, remark:'success',data:null})
})

app.use('/users',UserRouter)

  const PORT = 5000;
app.listen(PORT,()=>{
  console.log(`Server is runnig on http://localhost:${PORT}`);
})