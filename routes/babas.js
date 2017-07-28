var express = require("express");
var router  = express.Router();
var Baba = require("../models/baba");
var middleware = require("../middleware");


//INDEX - show all babas
router.get("/", function(req, res){
    // Get all babas from DB
    Baba.find({}, function(err, allBabas){
       if(err){
           console.log(err);
       } else {
          res.render("babas/index",{babas:allBabas});
       }
    });
});

//CREATE - add new baba to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to babas array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var num_players = req.body.num_players;
    var num_players_team = req.body.num_players_team;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newBaba = {name: name, image: image, description: desc, author:author, num_players:num_players, num_players_team:num_players_team }
    // Create a new baba and save to DB
    Baba.create(newBaba, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to babas page
            console.log(newlyCreated);
            res.redirect("/babas");
        }
    });
});

//NEW - show form to create new baba
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("babas/new"); 
});

// SHOW - shows more info about one baba
router.get("/:id", function(req, res){
    //find the baba with provided ID
    
    Baba.findById(req.params.id).populate("comments").populate("players").exec(function(err, foundBaba){
        if(err){
            console.log(err);
        } else {                        
            console.log(foundBaba)
            //render show template with that baba
            res.render("babas/show", {baba: foundBaba});            
        }
    });
});

// EDIT BABA ROUTE
router.get("/:id/edit", middleware.checkBabaOwnership, function(req, res){
    Baba.findById(req.params.id, function(err, foundBaba){
        res.render("babas/edit", {baba: foundBaba});
    });
});

// UPDATE BABA ROUTE
router.put("/:id",middleware.checkBabaOwnership, function(req, res){
    // find and update the correct baba
    Baba.findByIdAndUpdate(req.params.id, req.body.baba, function(err, updatedBaba){
       if(err){
           res.redirect("/babas");
       } else {
           console.log(updatedBaba);
           //redirect somewhere(show page)
           res.redirect("/babas/" + req.params.id);
       }
    });
});

// DESTROY BABA ROUTE
router.delete("/:id",middleware.checkBabaOwnership, function(req, res){
   Baba.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/babas");
      } else {
          res.redirect("/babas");
      }
   });
});


module.exports = router;

