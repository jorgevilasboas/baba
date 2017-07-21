var Baba = require("../models/baba");
var Comment = require("../models/comment");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.checkBabaOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Baba.findById(req.params.id, function(err, foundBaba){
           if(err){
               req.flash("error", "Baba não encontrado");
               res.redirect("back");
           }  else {
               // does user own the baba?
            if(foundBaba.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "Você não tem permissão para realizar essa operação.");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "Você precisa estar logado!");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "Você não tem permissão para realizar essa operação.");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "Você precisa estar logado!");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Você precisa estar logado!");
    res.redirect("/login");
}

module.exports = middlewareObj;