var mongoose = require("mongoose");

var babaSchema = new mongoose.Schema({
   name: String,   
   image: String,
   description: String,
   num_players: Number,
   num_players_team: Number,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Baba", babaSchema);