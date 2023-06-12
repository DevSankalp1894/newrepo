const {UserModel, PostModel} = require("../connection/connection");
  const bcrypt = require('bcrypt');
  var jwt = require('jsonwebtoken');


   const authenticator = async(req , res , next) => {
     
        // if(req.body.name && req.body.email && req.body.gender && req.body.password && req.body.city && req.body.age && req.body.is_married ){
  
        // next();

        // }
               const {email} = req.body;

               
         const userData = await UserModel.findOne({email:email})
           console.log(userData);

         if(userData.email == email){
              res.send({"msg" : "User already exist, please login"})
         }
      else if( userData.email !== email) {
           next();
      }

        
   }

     const loginAuthenticator = async(req , res, next) => {
          const token = req.headers.authorization;
          jwt.verify(token, 'masai', async(err, decoded) => {
            if(decoded){
              req.body.userID = decoded.id;
               let postData = new PostModel(req.body);
                 await postData.save();
                next();
            } 

            if(err){
              res.send({"msg" : "Register first"})
            }
            });
         
     }

      module.exports={authenticator,loginAuthenticator};

  

  


  

   