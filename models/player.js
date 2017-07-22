var mongoose = require("mongoose");

var playerSchema = mongoose.Schema({    
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },    
    skill: Number,
    goalkeeper: {type: Boolean, default: false },
    monthly:    {type: Boolean, default: false},
    enabled:    {type: Boolean, default: false},
    email: String,    
    phone: String
});

module.exports = mongoose.model("Player", playerSchema);