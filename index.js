//needed to import expressjs into our application
const express = require('express');
const appConfig=require('./config/appConfig');
const fs=require('fs');
//creating an instance of the class
const app = express()
const port = 3000

//Bootstrap route
let routesPath='./routes'
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

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))