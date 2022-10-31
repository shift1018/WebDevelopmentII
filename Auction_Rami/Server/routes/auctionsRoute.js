const express=require('express');
const router=express.Router();
const {auctions}=require('../models');
const apiErrorHandler=require('../error/apiErrorHandler');
const ErrorApi=require('../error/ErrorApi')


/**
 * VALIDATION
*/

//Returns throws ERROR if bid doesn't exists
async function doesBidExist(req,res,next){
    const result = await auctions.findOne({where:{
        id:req.params.bidItem
    }});

    req.result=result;

    if(result===null){
        // res.status(400).send("No such bid found!");
        req.isBidExist='false';
        next(ErrorApi.badRequest('No such bid found!'));
        return;
    }else{
        req.isBidExist='true'
        next();
    }
}

//Returns TRUE if new bid is higher than previous bid
async function isBidLarger(req,res,next){
    if(req.isBidExist){
        oldBid=req.result.lastBidPrice;
        newBid=req.body.lastBidPrice;
        
        if(newBid>oldBid){
            req.isBidLarger=true;
        }else{
            req.isBidLarger=false;
        }
        next();
        return;
    }
    next(err);
}


/**
*       ROUTES
*/
router.get('/',async(req,res)=>{
    const result = await auctions.findAll();
    res.json(result);
});

router.get('/bid/:bidId', async(req,res)=>{
    const result = await auctions.findAll({where:{
                                                    id:req.params.bidId
    }})
    
    res.send(result);
});

router.post('/',async(req,res)=>{
    const body=req.body;
    await auctions.create(body);
    res.json(body);
});

router.patch('/bidItem/:bidItem',doesBidExist,isBidLarger,apiErrorHandler,async(req,res)=>{
    if(req.isBidLarger===true){
        const bidNo= req.params.bidItem;
        const newBid=  req.body.lastBidPrice;
        const newEmail= req.body.lastBidderEmail;
        await auctions.update({
                                lastBidPrice:newBid,
                                lastBidderEmail:newEmail
                            },{where:{
                                id:bidNo
                            }
        });
        res.status(201).send('Congratulations '+newEmail+', your current bid of ' +newBid+ '$ is the highest!');
    }else{
        res.status(406).send("You were out-bidded!");
    }
});

module.exports=router;