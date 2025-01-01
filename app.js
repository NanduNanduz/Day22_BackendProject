const express = require('express');//web framework of node - express
const app = new express();

const morgan = require('morgan');//to see the logs of each api req
app.use(morgan('dev'));


//env file access using .env 3rd party module (install npm i dotenv), Sequire info, pass etc can store
require('dotenv').config();// require .env
require('./db/connection');


const nav = [
  { link: "/movies", name: "Home" },
  { link: "/movies/addform", name: "Add Movies" },
];

const movieRoutes = require('./routes/movieRoutes')(nav);
app.use('/movies',movieRoutes)//routes is redirecting to this app.js



app.set("view engine", "ejs"); //(instead if require ejs)node viewengines are pug and ejs
app.set("views", __dirname + "/views");//path to the folder which contain ejs

app.use(express.static("public"));


//Accessing post num from .env file process.env.variablename
app.listen(process.env.PORT,()=>{
    console.log(`Server is running ${process.env.PORT}`);//used tempelate literals
});