const express = require("express");
const userRouter = express.Router();
const {UserModel} = require("../connection/connection");
const {authenticator,loginAuthenticator} = require("../middleware/auth.middleware");
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

userRouter.post("/register" , async(req, res) => {
           const {name,email,gender,password,city,age,is_married} = req.body;
           
           try {
          bcrypt.hash(password, 5, async function(err, hash) {
            const userData = await UserModel.find();
       

          userData.forEach(async(el) => {
              if(el.email  === email){
                res.send({"msg" : "User already exist, please login"})
              }
              
          })


          let data = new UserModel({name,email,gender,password:hash,city,age,is_married});
          await data.save();
          res.send({"msg" : "Successfully registered"})
          
                 
           
           });
         }

         catch(err) {
                res.send({"msg" : err.message})
         }
        
})

userRouter.post("/login" , async(req, res) => {
 const {email,password} = req.body;
 const collection = await UserModel.find({email:email});
 bcrypt.compare(password, collection[0].password, function(err, result) {
       if(result){
         if(collection.length > 0){
             const userId = collection[0]._id;
             var token = jwt.sign({ id: userId }, 'masai');
               res.send({"token" : token});
             }
         
             else {
                   res.send({"msg" : "Register first"})
             }
       }
       else {
         res.send({"msg" : "Incorrect email or passord"})
       }
 });    
})

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjE3NjQ0ZTk1YWU1OTZkNTVlN2MyZSIsImlhdCI6MTY3OTkxNDkxN30.bwKx6_bTwI68Ngvijr2nmQpb9itYw8DWiBaimZ_o9Rs

module.exports={userRouter}





// {
//   "name":"shudha",
//   "email":"sudha@gmail.com",
//   "gender":"mail",
//   "password":"sudha",
//   "city":"rewa",
//   "age":28,
//   "is_married":false
// }

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjFiODc4MDU1NjUzNGFiOTNiNGI3YyIsImlhdCI6MTY3OTkzMTU2OX0.sJkVF6GxhOWO0BPrbTIBCCHXdP7u3dEFwQTNZR-NjK4


// {
//   "name" : "kumar",
//   "email":"kumar@gmail.com",
//   "gender":"mail",
//   "city":"jbp",
//   "password":"kumar",
//   "age":30,
//   "is_married":false
// }