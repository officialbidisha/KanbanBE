const express = require("express");

const router = express.Router();
const issueModel = require("../models/issues");
const memberModel = require("../models/members");
const projectModel = require("../models/projects");

const mongoose = require('mongoose');

module.exports = router;

/**
 * Get all issues
 */
router.get("/getIssues", async (req, res) => {
  try {
    const data = await issueModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Get all members
 */
router.get("/getMembers", async (req, res) => {
  try {
    const data = await memberModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Get all projects
 */
router.get("/getProjects", async (req, res) => {
  try {
    const data = await projectModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Post methods
 * Add new issue
 */
router.post("/issues/new", (req, res) => {
  const data = new issueModel({
    projectname: req.body.projectname,
    type: req.body.type,
    assignee: req.body.assignee,
    title: req.body.title,
    summary: req.body.summary,
    status: req.body.status,
    priority: req.body.priority,
    description: req.body.description,
    storypoint: req.body.storypoint,
  });
  try {
    const dataToSave = data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * Add new member
 */
router.post("/members/new", (req, res) => {
  const data = new memberModel({
    name: req.body.name,
    projects: req.body.projects,
  });
  try {
    const dataToSave = data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * Add new project
 */
router.post("/projects/new", (req, res) => {
  const data = new projectModel({
    name: req.body.name,
    description: req.body.description,
    members: req.body.members,
  });
  try {
    const dataToSave = data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/***
 * Edit issue by id
 */

router.patch("/issue/:id", async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    console.log(id);
    const updatedData = req.body;
    console.log(updatedData);
    const options = { new: true };
    const result = await issueModel.findByIdAndUpdate(id, updatedData, options);
    console.log(result);
    res.send(result);
    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * Starts with
 */
router.get("/issue/startsWith/:data", async (req, res) => {
  try {
    const data = await issueModel.find();
    const filterData = await data.filter((d) =>
      d.title.toLowerCase().startsWith(req.params.data.toLowerCase())
    );
    res.json(filterData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Get members that include member names
 */
router.post("/member/includes/", async (req, res) => {
  try {
    const data = await  memberModel.find();
    const list = req.body.data;
    let filteredData = [];
    for(let i=0;i<list.length;i++){
      for(let j=0;j<data.length;j++){
       if(data[j].name.includes(list[i])){
         filteredData.push(data[j]);
       }
      }
    }
    filteredData = filteredData.length>0? filteredData: data;
    res.json(filteredData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Delete issue by id
 */
router.delete('/issue/:id', async(req,res)=> {
  try{
        const id = req.params.id;
        const data = await issueModel.findByIdAndDelete(id)
        res.send(`Issue with title ${data.title} has been deleted..`)
  }
  catch(e){
    res.status(500).json({message: error.message});
  }
});