const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => { 
    const {username, password} = req.body;
    // const user = await Users.findOne({ where: { username: username } });
  
    // if (user) res.json({ error: "User  Exist" });

    bcrypt.hash(password, 10).then((hash)=>{
        Users.create({
            username: username,
            password: hash
        })
        res.json("success");
        } );
 
  });

  router.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    const user = await Users.findOne({ where: { username: username } });
  
    if (!user) res.json({ error: "User Doesn't Exist" });
  
    bcrypt.compare(password, user.password).then(async (match) => {
      if (!match) res.json({ error: "Wrong Username And Password Combination" });
  
      const accessToken = sign(
        { username: user.username, id: user.id },
        "importantsecret"
      );
      res.json({ token: accessToken, username: username, id: user.id });

    });
  }); 

  // router.get('/byname/:username', async (req,res)=>{
  //   const username = req.params.username;
  //   const td = await Users.findOne({ where: { username:username } });
  //   res.json(td);
  
  // })
module.exports = router;