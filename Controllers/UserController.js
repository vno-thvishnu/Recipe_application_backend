const UserModel = require("../Models/UserModel.js");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

exports.getUser = async (req, res) => {
    const id = req.params.id;
  
    try {
      const user = await UserModel.findById(id);
  
      if (user) {
        const { password, ...otherDetails } = user._doc;
  
        res.status(200).json({ otherDetails, message: "finded" });
      } else {
        res.status(404).json("No such user Exists");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };

  
exports.followUser = async (req, res) => {
    const id = req.params.id;
    const { currentUserId } = req.body;
  
    if (currentUserId === id) {
      res.status(200).json("Action forbidden");
    } else {
      try {
        const followUser = await UserModel.findById(id);
        const followingUser = await UserModel.findById(currentUserId);
        if (!followUser.followers.includes(currentUserId)) {
          await followUser.updateOne({ $push: { followers: currentUserId } });
          await followingUser.updateOne({ $push: { following: id } });
          res.status(200).json("User followed!");
        } else {
          res.status(200).json("User is Already followed by you");
        }
      } catch (error) {
        res.status(500).json(error);
      }
    }
  };
  
  exports.unFollowUser = async (req, res) => {
    const id = req.params.id;
    const { currentUserId } = req.body;
  
    if (currentUserId === id) {
      res.status(200).json("Action forbidden");
    } else {
      try {
        const followUser = await UserModel.findById(id);
        const followingUser = await UserModel.findById(currentUserId);
        if (followUser.followers.includes(currentUserId)) {
          await followUser.updateOne({ $pull: { followers: currentUserId } });
          await followingUser.updateOne({ $pull: { following: id } });
          res.status(200).json("User unfollowed!");
        } else {
          res.status(200).json("User is not followed by you");
        }
      } catch (error) {
        res.status(500).json(error);
      }
    }
  };
  
  exports.removeImages = async (req, res) => {
    try {
      const id = req.params.id;
  
      const { profileImage_publicId, coverImage_publicId } = req.body;
  
      if (profileImage_publicId) {
        const dlt = await cloudinary.uploader.destroy(profileImage_publicId);
        res.status(200).json(dlt);
      }
      if (coverImage_publicId) {
        const dlt = await cloudinary.uploader.destroy(coverImage_publicId);
        res.status(200).json(dlt);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };
  exports.updateUser = async (req, res) => {
    const id = req.params.id;
    const{userName,profileImage,profileImage_publicId,coverImage,coverImage_publicId,
      bio,workingAs}=req.body
      
      const findUser = await UserModel.findOne({userName:userName});
      // console.log(findUser)
      // console.log(findUser._id.toString())
      // console.log(id)
      // console.log(findUser._id.toString() !==id)
      try {
   if(!findUser ||findUser._id.toString() ===id ){
    
    const user = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (user) {
      const { password, ...otherDetails } = user._doc;

      res.status(200).json({ otherDetails,message:"Updated successfully" });
    }
  }else if(findUser._id.toString() !==id){
    const user = await UserModel.findByIdAndUpdate(id,
      {profileImage,profileImage_publicId,coverImage,coverImage_publicId,
      bio,workingAs}, {
      new: true,
    });

    if (user) {
      const { password, ...otherDetails } = user._doc;

      res.status(200).json({ otherDetails,message:"Try another username" });
    }
  
  }
      } catch (error) {
        res.status(500).json(error);
      }
    
    // res.status(403).json("Access Denied!  you can only update your own profile");
  };
  