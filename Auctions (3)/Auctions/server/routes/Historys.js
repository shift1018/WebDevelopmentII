const express = require("express");

const router = express.Router();
const { Historys } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req,res)=>{

    const his = await Historys.findAll();
    res.json(his);
  
  })
// GET /api/Historys/id

router.get('/:auctionId', async (req,res)=>{
  const auctionId = req.params.auctionId;
  const his = await Historys.findAll({where:{AuctionId: auctionId}});
  res.json(his);

})


// POST /api/Historys
router.post("/",validateToken, async (req, res) => {
  const his = req.body;
  await Historys.create(his);
  res.json(his);
});



router.delete("/delete/:id", validateToken, async(req,res)=>{
  const aucid = req.params.id;
  await Historys.destroy({
    where:{
      id: aucid
    }
  });
  res.json("delete")
});


module.exports = router;



