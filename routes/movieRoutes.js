const express = require("express");

const router = express.Router();

router.use(express.json()); // for working post operation

router.use(express.urlencoded({ extended: true }));

const movieModel = require("../model/movieData");


function movieroutes(nav){
  //get
  router.get("/", async (req, res) => {
    try {
      const data = await movieModel.find(); //fetching data from db
      res.render("home", {
        //home - ejs file
        title: "Cards",
        data, //data fetched from the db
        nav,
      });
    } catch (error) {
      res.status(404).send("Data not foound");
    }
  });

  //this route addform url is given to the link 
  router.get("/addform", (req, res) => {
    res.render("form", {
    
      nav
    });
  });


  //post
  router.post("/addmovie", async (req, res) => {
    try {
      var item = req.body;
      const data = new movieModel(item); //item is embedded  and the data into the created instance of schema
      await data.save();
      res.redirect('/movies')
    } catch (error) {
      res.status(404).send("post unsuccessful");
    }
  });

router.get('/updatepage/:id', async(req,res)=>{
  const data = await movieModel.findOne({"_id": req.params.id})
  res.render('updateform',{
    nav,
    data,
    movieid:req.params.id
  })
})


  //update(put changed in to post)
  router.post("/edit/:id", async (req, res) => {
    try {
      const data = await movieModel.findByIdAndUpdate(req.params.id, req.body);
      res.redirect("/movies");
    } catch (error) {
      res.status(404).send("Update UnSuccessful");
    }
  });

  //delete
  router.delete("/delete/:id", async (req, res) => {
    try {
      const data = await movieModel.findByIdAndDelete(req.params.id);
      if (data) {
        res.status(200).send("Delete Successful");
      }
    } catch (error) {
      res.status(404).send("Delete Unsuccessful");
    }
  });

  return router;
}

module.exports = movieroutes;


