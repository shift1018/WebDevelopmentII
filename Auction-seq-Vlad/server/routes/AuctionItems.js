const express = require("express");
const router = express.Router();
const { AuctionItems } = require("../models");

router.get("/api/auctions", async (req, res) => {
    const listOfAuctionItems = await AuctionItems.findAll();
    res.json(listOfAuctionItems);
});

router.post("/api/auctions", async (req, res) => {
    const auctionItems = req.body;
    await AuctionItems.create(auctionItems);
    res.json(auctionItems);
});

router.get("/api/auction/:id", async (req, res) => {
    const id = req.params.id;
    const auction = await AuctionItems.findAll({
        where: {
            id: id
          }
    });
    res.json(auction);
});

router.patch("/api/auctions/:id", async (req, res) => {
    const id = req.params.id;
    const lastBidPrice = req.body.lastBidPrice;
    const lastBidderEmail = req.body.lastBidderEmail;
    await AuctionItems.update({ lastBidPrice: lastBidPrice, lastBidderEmail: lastBidderEmail }, {
        where: {
          id: id
        }
    });
});

router.delete("/api/delete/:id", async (req, res) => {
    const id = req.params.id;
    await AuctionItems.destroy({
        where: {
          id: id
        }
    });
});

module.exports = router;