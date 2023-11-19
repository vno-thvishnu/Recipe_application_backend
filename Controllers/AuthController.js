const UserModel = require("../Models/UserModel.js");
const bcrypt = require("bcrypt");


exports.registerUser = async(req,res)=>{
    delete req.body.confirmpassword;
    const {userEmail,password,userName,profileImage,coverImage,bio,workingsAs}=req.body;
    const findUserEmail = await UserModel.findOne({ userEmail: userEmail });
    const finduserName = await UserModel.findOne({ userName: userName });
try{
    if(!findUserEmail && !finduserName){
        const salt =await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password,salt);

        const newUser = new UserModel({
            userEmail,
            userName,
            password: hashpassword,
            bio:"",
            workingsAs:"",
            profileImage:"",
            coverImage:"",
          });

      await newUser.save();
      res.status(200).json({ message: "Registered Successfully" });
    }else{
        if (findUserEmail && !finduserName) {
            res.status(200).json({ message: "Email-id already in use" });
          } else if (finduserName && !findUserEmail) {
            res.status(200).json({ message: "Username already in use" });
          } else if (findUserEmail && finduserName) {
            res
              .status(200)
              .json({ message: "Email-id & Username already in use" });
          }
    }
}catch (error) {
    res.status(500).json({ message: error.message });
  }

};

exports.loginUser = async (req, res) => {
    const { userEmail, password } = req.body;
    try {
      const user = await UserModel.findOne({ userEmail: userEmail });
      if (user) {
        const validity = await bcrypt.compare(password, user.password);
  
        if (validity) {
          const { password, ...otherDetails } = user._doc;
          res.status(200).json({ otherDetails, message: "Login Successfully" });
        } else {
          res.status(200).json({ message: "Username or Password incorrect" });
        }
      } else {
        res.status(200).json({ message: "Username or Password incorrect" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  