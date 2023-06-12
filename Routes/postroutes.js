const express = require("express");
const postRouter = express.Router();
const {UserModel,PostModel} = require("../connection/connection");
var jwt = require('jsonwebtoken');
const {authenticator,loginAuthenticator} = require("../middleware/auth.middleware");

    postRouter.post("/add", loginAuthenticator, async(req , res) => {
          try {
                     res.send({"msg" : "Your Posts added successfully"})
          }

          catch(err){
                res.send({"msg" : err.message})
          }
    })

    postRouter.get("/", async(req , res) => {
        let token = req.headers.authorization;
        let decoded = jwt.verify(token , "masai");
        const{mobile,tablet,laptop}=(req.query);
        const {min,max} = req.query;
        const mi = Number(min);
        const mx=Number(max);
       
      try {
            if(decoded){
             let posts = await PostModel.find({userID : decoded.id});
             if(mobile){
                const mpost = await PostModel.find({userID : decoded.id , device:mobile});
                res.send(mpost);
             }

             if(mobile && tablet){
                const mpost = await PostModel.find({userID : decoded.id} ,{ device: { $in: ["mobile", "tablet"] } });
                res.send(mpost);
             }

             if(min && max){
                const cpost = await PostModel.find({userID : decoded.id} ,{ no_of_comments: { $gte: mi, $lte: mx } });
                res.send(cpost).limit(3);
             }

           

             res.send(posts);
            }
            
            else {
                  res.send({"msg" : "No post has been created"});
            }
             
      }
      catch(err){
            res.send({"msg" : err.message})
      }   
})

postRouter.get("/top", async(req , res) => {
    let token = req.headers.authorization;
    let decoded = jwt.verify(token , "masai");
   
  try {
        if(decoded){
         let posts = await PostModel.find({userID : decoded.id}).sort({ no_of_comments: -1 }).limit(3);
         res.send(posts);
        }
        
        else {
              res.send({"msg" : "No post has been created"});
        }
         
  }
  catch(err){
        res.send({"msg" : err.message})
  }   
})



  postRouter.delete("/delete/:postID" , async(req , res) => {
       const {postID} = req.params;
       
        try {
         let data = await PostModel.findByIdAndDelete({_id:postID});
          if(data.length > 0){
           res.send(data);
          }

          else {
              res.send({"msg" : "No post add post first"})
          }
        }

       catch(err) {
            res.send({"msg" :err.message})
       }
  })

  postRouter.patch("/update/:postID" , async(req , res) => {
      const {postID} = req.params;
       try {
        let data = await PostModel.findByIdAndUpdate({_id:postID} , req.body);
         if(data.length > 0){
          res.send(data);
         }

         else {
             res.send({"msg" : "No post add Note first"})
         }
       }

      catch(err) {
           res.send({"msg" :err.message})
      }
 })

      module.exports = {postRouter}




      // {
    
      //       "title":"nem",
      //       "device":"mobile",
      //       "no_of_comments":10,
      //       "body":"eval"
              
      //         }