  const mongoose = require("mongoose");
  require("dotenv").config();

  const connection = mongoose.connect(process.env.mongoURL);

  const userSchema = mongoose.Schema({
    name : String,
    email : String,
    gender : String,
    password : String,
    age : Number,
    city : String,
    is_married : Boolean,
  })

  const postSchema = mongoose.Schema({
    title : String,
    body : String,
    device : String,
    no_of_comments : Number,
    userID:String
  })

  const UserModel= mongoose.model("user" , userSchema);
  const PostModel= mongoose.model("post" , postSchema);

  module.exports={connection, UserModel , PostModel}