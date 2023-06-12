  const express = require("express");
  const cors=require("cors");
  const {connection} = require("./connection/connection");
  const {userRouter} = require("./Routes/useroutes");
  const {postRouter} = require("./Routes/postroutes")
  require("dotenv").config();
  const app=express();
  app.use(express.json());
  app.use(cors());

  app.use("/users" , userRouter);
  app.use("/posts" , postRouter);

  app.listen(process.env.port , async() => {
       try{
           await connection
           console.log("connected to DB")
       }

       catch(err){
            console.log("Not connected to DB")
       }

       console.log(`server is running on port ${process.env.port}`)
  })

