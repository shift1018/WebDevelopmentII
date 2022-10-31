const express = require("express");

const router = express.Router();
const { Auctions } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");


// GET /api/auctions
router.get("/",  async (req, res) => {
  const listOfAucs = await Auctions.findAll();
  res.json(listOfAucs);
});


router.get('/byId/:id', async (req,res)=>{
  const id = req.params.id;
  const auc = await Auctions.findByPk(id);
  res.json(auc);

})


// POST /api/auctions
router.post("/", validateToken, async (req, res) => { 
  const auc = req.body;
  auc.username = req.user.username;
  auc.UserId = req.user.id;
  await Auctions.create(auc);
  res.json(auc);
});

router.put("/update/:id", validateToken, async(req,res)=>{
  const id = req.params.id;
  const bid = req.body;
  await Auctions.update({ lastBidPrice: bid.newPrice, lastBidderEmail: bid.newBidder }, { where: { id: id } });
  res.json(req.body);
  
  });



router.delete("/delete/:id", validateToken, async(req,res)=>{
  const aucid = req.params.id;
  await Auctions.destroy({
    where:{
      id: aucid
    }
  });
  res.json("delete")
});


module.exports = router;



// Design an implement an RESTful API only the necessary calls, e.g.:

// GET /api/auction/123 (if needed)

// PATCH /api/auctions/123

// Advanced: add validation for data consistency to the API.