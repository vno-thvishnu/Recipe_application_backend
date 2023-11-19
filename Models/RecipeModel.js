const mongoose = require ("mongoose")

const RecipeSchema=mongoose.Schema({
    
    userId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    recipe:{
        type:String,
        required:true
    },
    private:{
        type:Boolean,
        required:true
    },
    userName:String,
    profileImage: String,
    ingredients:[],
    likes:[],
    comments:[],
     recipeImage: String,
    recipeImage_publicId: String,
},
{timestamps: true}
)

const RecipeModel=mongoose.model("Recipes",RecipeSchema);
module.exports= RecipeModel