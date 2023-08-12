const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const JWT_SECRTE = "ankitisagoodboy";
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");


//ROUTE 1 create a user using POST "api/auth/createuser". no login require
router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 5 }),
    body("password", "password must be alest 5 char").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //check wheater user with this email is exist alredy or not
    try {
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this alredy exist" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      // .then(user => res.json(user))
      // .catch(err=> {console.log(err)
      // res.json({error: "Please enter a unique value.", message: err.message})})
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRTE);
      res.json({ authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
  }
);
// ROUTE 2 authenticate a user using POST "api/auth/login". no login require
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // if there are error return dad request add the error
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "please try to login with correct credentials" });
      }
      const passwordcompare = await bcrypt.compare(password, user.password);
      if (!passwordcompare) {
        return res
          .status(400)
          .json({ error: "please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRTE);
      res.json({ authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error");
    }
  }
);

// ROUTE 3 get user details using POST "api/auth/getuser". Login Require
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    let user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error");
  }
});
module.exports = router;
