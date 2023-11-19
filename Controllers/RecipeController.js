const RecipeModel = require("../Models/RecipeModel");
const UserModel = require ("../Models/UserModel")
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
  

exports.createPost = async(req,res)=>{

    const{userId,title,recipe,private,ingredients,likes,comments,recipeImage,
        recipeImage_publicId,userName,profileImage}= req.body;
        const findUser = await UserModel.findOne({_id: userId});
        const findRecipe = await RecipeModel.find({title: title});

        const check = findRecipe.some(fun);
        function fun(findRecipe){
            return userId === findRecipe.userId
        }

try{
    if(check === true){
        res.status(200).json({ message: "You already created this title, Try another" });

    }else if(check === false){
        const newPost = new RecipeModel({
            userId,title,recipe,private,ingredients,likes,comments,recipeImage,
            recipeImage_publicId,
            userName :findUser.userName,
            profileImage :findUser.profileImage
        });
await newPost.save();

res.status(200).json({ message: "Recipe Created Successfully" });
    }else{
        res.status(200).json({ message: "Id Not Found" });
    }
}catch (error) {
    res.status(500).json({ message: error.message });
  }
    };

exports.getAllRecipe = async(req,res)=>{
    try {
        let recipes = await RecipeModel.find();
        // recipes= recipes.map((x)=>{
        //     const {title, ...otherDetails} = x._doc;
        //     return otherDetails;
        // })
        res.status(200).json(recipes)
    } catch (error) {
        res.status(500).json(error);
    }
}

  exports.getUserRecipe = async(req,res)=>{
    const id =req.params.id;
    try{
        const find = await RecipeModel.find({userId:id});
        
        res.status(200).json({ find, message: "finded" });
    } catch (error) {
        res.status(500).json(error);
      }
  }

  exports.deleteRecipe = async(req,res)=>{
    const id=req.params.id;
    const{userId}=req.body;
    try {
        const find = await RecipeModel.findById(id);
        if(find.userId === userId){
            await RecipeModel.findByIdAndDelete(id);
            res.status(200).json("Recipe deleted Successfully");
        }else{
            res.status(200).json("You dont have permission");
        }
    } catch (error) {
        res.status(500).json(error);
    }
  }
exports.updateRecipe=async(req,res)=>{
    const id=req.params.id;
    const{userId,title,recipe,private,ingredients,recipeImage,
        recipeImage_publicId}= req.body;

        // const currentOne = await RecipeModel.findById(id);
        const findRecipe = await RecipeModel.find({title: title});

        const check = findRecipe.some(fun);
        function fun(findRecipe){
            return userId === findRecipe.userId 

        }
        const check2 = findRecipe.filter(fun);
        function fun(findRecipe){
            return userId === findRecipe.userId 

        }
// console.log(check)
// console.log(check2)
// console.log(check2[0]._id.toString() === id)
// console.log(id)

     try {
       if(check === false || check2[0]._id.toString()===id ){
        const recipe = await RecipeModel.findByIdAndUpdate(id, req.body, {
            new: true,});
          if (recipe) {
            res.status(200).json({ recipe,message:"Updated Successfully"});
          }
        }else if(check === true){
            res.status(200).json({ message: "You already created this title, Try another" });
    
        }
     } catch (error) {
        res.status(500).json(error);
     }   
}
