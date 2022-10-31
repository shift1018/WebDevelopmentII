const express = require('express');
const cors = require('cors');
// const { Sequelize } = require('sequelize');
const app = express();
const port=3001;


app.use(express.json());
app.use(cors());
app.use(middleware);


// const sequelize=new Sequelize('auctiondb','root','Taiwan2025',{host:'localhost',dialect:'mysql'});
const db=require('./models/index');

async function middleware(req,res,next){
    try{
        await db.sequelize.authenticate();
        console.log("Connection has been established");
        next();
    }catch(error){
        console.error("Unable to connect to the database",error);
        next();
    }
}
const aucRoute=require('./routes/auctionsRoute');
app.use('/',aucRoute);


app.listen(port,()=>{
    console.log("listening on port: "+port);
})