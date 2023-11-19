const express = require("express")
const {createPost,getUserRecipe,deleteRecipe,getAllRecipe,updateRecipe}=require("../Controllers/RecipeController.js")

const router=express.Router()

router.post('/create',createPost)
router.get('/get_user_recipe/:id',getUserRecipe)
router.delete('/delete/:id',deleteRecipe)
router.get('/get_all_recipe',getAllRecipe)
router.put('/update/:id',updateRecipe)

module.exports =router