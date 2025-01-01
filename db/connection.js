//install npm i mongoose (3rd party) for to connect db
const mongoose = require('mongoose');
//js promise is giving through .then(success) and .catch(reject) 
mongoose
  .connect(process.env.mongoDB_URL)
  .then(() => {
    console.log("Connection established to DB");
  })
  .catch(()=>{
    console.log('Not Connected');
  });