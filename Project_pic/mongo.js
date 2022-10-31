const mongoose = require('mongoose');
const env =require('./environment/environment');

mongoose.Promise = global.Promise;

const env = {
    dbName:'theresto',
    key:'glwSQ6LSb7bdYwFLkXzwcmHATKdgIsREETVlplbNQk4CmUimXSnMVHN3DTG1wljZCQuUy77FL7LwRcXPeNOgCA==',
    port:10255

};

const mongoUrl = `mongodb://${env.dbName}:${env.key}@${env.dbName}.documents.azure.com:${env.cosmosPort}/?ssl=true`;
// mongodb://theresto:glwSQ6LSb7bdYwFLkXzwcmHATKdgIsREETVlplbNQk4CmUimXSnMVHN3DTG1wljZCQuUy77FL7LwRcXPeNOgCA==@theresto.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@theresto@


function connect(){
    return mongoose.connect(mongoUrl,{useMongoClient:true});

}


 module.exports= {
    connect,
    mongoose

 }