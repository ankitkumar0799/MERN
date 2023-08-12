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

module.exports = router;
