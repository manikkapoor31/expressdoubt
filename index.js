//needed to import expressjs into our application
const express = require('express');
const appConfig=require('./config/appConfig');
const fs=require('fs');
const mongoose= require('mongoose');
//creating an instance of the class
const app = express()

const cookieParser=require('cookie-parser')
const bodyParser= require('body-parser')
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())

//Bootstrap route
let routesPath='./routes';
let modelsPath='./models';
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

fs.readdirSync(modelsPath).forEach(function(file){
    if(~file.indexOf('.js')) require(modelsPath+'/'+file)
})

app.listen(appConfig.port, () =>{
    console.log(`Example app listening at http://localhost:${port}`);

    //creating the mongo db connection here 
    let db=mongoose.connect(appConfig.db.uri,{useMongoClient: true});

})

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