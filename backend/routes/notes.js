const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Note = require("../models/Note");
var fetchuser = require("../middleware/fetchuser");

//ROute 1 Get All The Notes using GET '/api/auth/fetchallnotes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try{
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
    }catch(error){
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
});

//ROute 1 ass a new Note using POSt '/api/auth/addnote
router.post("/addnote",fetchuser,[
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description","Enter a valid description must be atleast 5 characters").isLength({ min: 5 }),],async (req, res) => {

  try{
    const {title, description,tag} = req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const note = new Note({
title,description,tag, user: req.user.id
    })
    const savedNote = await note.save()

    res.json(savedNote);


}catch(error){
    console.log(error.message);
    res.status(500).send("Some error occured");
}
  
})

//ROute 3 update a note using POSt '/api/auth/updatenote login reqiured
router.put("/updatenote/:id",fetchuser,async (req, res) => {
  const {title,description,tag} = req.body;

  //craete a newnote object
  const newNotes = {};
  if(title){newNotes.title = title};
  if(title){newNotes.description = description};
  if(title){newNotes.tag = tag};
 

  //find the note to be updated and update it
  //const note = Note.findByIdAndUp();
  let note = await Note.findById(req.params.id);
  if(!note){return res.status(404).send("Not Found")}



  //check user is same or not
  if(note.user.toString() !== req.user.id){
    return res.status(401).send("Not Allowed");
  }


  // if the upper validation is not working also then the note is exsist
  note = await Note.findByIdAndUpdate(req.params.id,{$set: newNotes},{new:true})
  res.json({note});

  })

module.exports = router;
