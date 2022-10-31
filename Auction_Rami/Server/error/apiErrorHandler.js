const ErrorApi =require("./ErrorApi");

function apiErrorHandler(err,req,res,next){

    if(err instanceof ErrorApi){
        res.status(err.code).json(err.msg);
        console.log("apiErrorHandler called");
        return ;
    }

    res.status(500).json('Whoops! Something went wrong');
}

module.exports=apiErrorHandler;