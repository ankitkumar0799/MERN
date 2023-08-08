const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');


router.get('/',
[
    body('email',"Enter a valid email").isEmail(),
    body('name',"Enter a valid name").isLength({min: 5}),
    body('email',"password must be alest 5 char").isLength({min: 5}),


]
,(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,

      }).then(user => res.json(user))
      .catch(err=> {console.log(err)
      res.json({error: "Please enter a unique value.", message: err.message})})
  
})

module.exports = router