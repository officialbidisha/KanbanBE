const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
     name:{
        required: true,
        type: String
     },
     projects: {
        required: true,
        type: Array
     }
  },
  { collection: "Members" }
);

module.exports = mongoose.model("Member", memberSchema);
