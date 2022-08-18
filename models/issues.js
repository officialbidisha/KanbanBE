const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    projectname: {
      required: true,
      type: String,
    },
    type: {
      required: true,
      type: String,
    },
    assignee: {
      required: true,
      type: String,
    },
    title: {
      required: true,
      type: String,
    },
    summary: {
      required: true,
      type: String,
    },
    status: {
      required: true,
      type: String,
    },
    priority: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    storypoint: {
      required: true,
      type: Number,
    },
  },
  { collection: "Issues" }
);

module.exports = mongoose.model("Issue", issueSchema);
