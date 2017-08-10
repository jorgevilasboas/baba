var express = require("express");
var router  = express.Router({mergeParams: true});
var Baba = require("../models/baba");
var Player = require("../models/player");
var middleware = require("../middleware");

//Players New
router.get("/new",middleware.isLoggedIn, function(req, res){
    // find baba by id
    console.log(req.params.id);
    Baba.findById(req.params.id, function(err, baba){
        if(err){
            console.log(err);
        } else {
             res.render("players/new", {baba: baba});
        }
    })
});

//Players Create
router.post("/",middleware.isLoggedIn,function(req, res){
   //lookup baba using ID
   Baba.findById(req.params.id, function(err, baba){
       if(err){
           console.log(err);
           res.redirect("/babas");
       } else {
           var existe = false;
           Player.find

           //for 
           if (!existe) {
               Player.create(req.body.player, function(err, player){
                   if(err){
                       req.flash("error", "Something went wrong");
                       console.log(err);
                   } else {
                       //add username and id to player
                        player.author.id = req.user._id;
                        player.author.username = req.user.username;
                        //save player
                        player.save();
                        baba.players.push(player);
                        baba.save();
                        console.log(player);
                        req.flash("success", "Successfully added player");
                        res.redirect('/babas/' + baba._id);
                    }
                });
           } else {
               req.flash("success", "Jogador já cadastrado no baba!");
               res.redirect('/babas/' + baba._id);
           }
        
       }
   });
});

// PLAYER EDIT ROUTE
router.get("/:player_id/edit", middleware.checkPlayerOwnership, function(req, res){
   Player.findById(req.params.player_id, function(err, foundPlayer){
      if(err){
          res.redirect("back");
      } else {
        res.render("players/edit", {baba_id: req.params.id, player: foundPlayer});
      }
   });
});

// PLAYER UPDATE
router.put("/:player_id", middleware.checkPlayerOwnership, function(req, res){
   Player.findByIdAndUpdate(req.params.player_id, req.body.player, function(err, updatedPlayer){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/babas/" + req.params.id );
      }
   });
});

// PLAYER DESTROY ROUTE
router.delete("/:player_id", middleware.checkPlayerOwnership, function(req, res){
    //findByIdAndRemove
    Player.findByIdAndRemove(req.params.player_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Player deleted");
           res.redirect("/babas/" + req.params.id);
       }
    });
});

module.exports = router;