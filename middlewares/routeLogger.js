const express = require("express");
const appConfig=require("./../config/appConfig")
const time =require('./../libs/timeLib')

let requestIpLogger=(req,res,next)=>{
    let remoteIp=req.connection.remoteAdddress+'://'+req.connection.remotePort;
    let realIp=req.headers['X-REAL-IP'];
    console.log(req.method+"Request Made from "+ remoteIp+'for route'+req.originalUrl+ '@ time: '+time.now())
    if(req.method==='OPTIONS')
    {
        console.log('!OPTIONS'+'@ Time:'+time.now());
        var headers={};
        headers["Access-Control-Allow-Origins"]="*";
        headers["Access-Control-Allow-Methods"]="POST,GET,PUT,DELETE,OPTIONS";
        headers["Access-Control-Allow-Credentials"]=false;
        headers["Access-Control-Allow-Max-Age"]='86400'
        headers["Access-Control-Allow-Headers"]="X-requested-With,X-HTTP-Method-Ovevrride,Content"
        res.writeHead(200,headers);
        res.end();
    }
    else{
        //enanle or disable CORS here
        res.header("Allowed-Control-Allow-Origin",appConfig.allowedCorsOrigin);
        res.header("Acess-Control-Allow-Methods","GET,PUT,POST,DELETE,OPTIONS")
        res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept")
        //console.log(res.header)
        //end of cors config
        next()
    }
}
module.exports={
    logIp:requestIpLogger
}
