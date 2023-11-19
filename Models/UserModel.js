const mongoose= require ("mongoose")

const UserSchema=mongoose.Schema({
    userEmail:{
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    userName:{
        type: String,
        require: true
    },
    profileImage: String,
    profileImage_publicId: String,
    coverImage: String,
    coverImage_publicId: String,
    bio: String,
    workingsAs:String,
    likedPosts:[],
    ownPosts:[],
    followers: [],
    following: []

},
{timestamps: true}

)

const UserModel=mongoose.model("Users",UserSchema);

module.exports = UserModel