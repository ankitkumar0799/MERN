const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const JWT_SECRTE = "ankitisagoodboy";
var jwt = require('jsonwebtoken');


router.post('/createuser',
[
    body('email',"Enter a valid email").isEmail(),
    body('name',"Enter a valid name").isLength({min: 5}),
    body('email',"password must be alest 5 char").isLength({min: 5}),


]
, async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    
    //check wheater user with this email is exist alredy or not
    try {
    let user = await User.findOne({email: req.body.email});
    console.log(user)
    if (user){
      return res.status(400).json({error: "Sorry a user with this alredy exist"})
    }
    const salt = await bcrypt.genSalt(10);
    const secPass =await  bcrypt.hash(req.body.password, salt) 
  user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,

      });
      
      // .then(user => res.json(user))
      // .catch(err=> {console.log(err)
      // res.json({error: "Please enter a unique value.", message: err.message})})
      const data = {
        user:{
          id: user.id
        }
      }
     const authtoken = jwt.sign(data, JWT_SECRTE);
     res.json({authtoken})
      
    }catch (error){
      console.log(error.message);
      res.status(500).send("Some error occured")
    }
  
})

module.exports = router