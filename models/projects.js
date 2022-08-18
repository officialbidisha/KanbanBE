const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
     name:{
        required: true,
        type: String
     },
     description:{
        required: true,
        type: String
     },
     members: {
        required: true,
        type: Array
     }
  },
  { collection: "Members" }
);

module.exports = mongoose.model("Projects", projectSchema);
