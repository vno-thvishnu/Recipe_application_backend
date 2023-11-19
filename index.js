const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();


const AuthRoute = require("./Routes/AuthRoute.js");
const RecipeRoute = require("./Routes/RecipeRoute.js");
const UserRoute = require ("./Routes/UserRoute.js")

//Routes

//Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(
  {
  // origin: "http://localhost:3000",
  // origin: "https://recipe-application-frontend.vercel.app/",
  origin:"*"
}
));
app.use(express.json());

// const PORT = process.env.PORT;

const CONNECTION = process.env.MONGO_DB;
mongoose
  .connect(CONNECTION
    // , { useNewUrlParser: true, useUnifiedTopology: true }
    )
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

//usage of routes
app.use("/auth", AuthRoute);
app.use("/recipe", RecipeRoute);
app.use("/user",UserRoute)



app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);