//needed to import expressjs into our application
const express = require('express');

const fs=require('fs');
const mongoose= require('mongoose');
const appConfig=require('./config/appConfig');


//creating an instance of the class
const cookieParser=require('cookie-parser')
const bodyParser= require('body-parser')
const app = express()


const port = 3000

//middlewares
app.use(bodyParser.json()) //using a middleware [app-application] expecting json input
app.use(bodyParser.urlencoded({extended:false}))//expecting urlencoded input 
app.use(cookieParser())

//Bootstrap Models
let modelsPath='./models';
fs.readdirSync(modelsPath).forEach(function(file){
    if(~file.indexOf('.js')) require(modelsPath+'/'+file)
})

app.listen(appConfig.port, () =>{
    console.log(`Example app listening at http://localhost:${port}`);
    //creating the mongo db connection here 
    let db=mongoose.connect(appConfig.db.uri,{useMongoClient: true});

})

//Bootstrap route
let routesPath='./routes';
fs.readdirSync(routesPath).forEach(function(file){
    if(~file.indexOf('.js'))
    {
        console.log("including the following file");
        console.log(routesPath+'/'+file);
        let route=require(routesPath+'/'+file);
        route.setRouter(app);
    }
});
//end bootstrap route



mongoose.connection.on('error',function(err){
    console.log('database connection error');
    console.log(err);
})

mongoose.connection.on('open',function(err){
    if(err){
        console.log("database error");
        console.log(err);
    }
    else{
        console.log("database connection open success")
    }
})