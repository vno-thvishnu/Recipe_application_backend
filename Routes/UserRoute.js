const express = require("express")
const{getUser, removeImages,updateUser}=require("../Controllers/UserController")

const router=express.Router()

router.get('/getuser/:id',getUser)
router.put('/removeimg/:id',removeImages)
router.put('/update/:id',updateUser)

module.exports =router