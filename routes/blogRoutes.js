const express= require('express')
const blogController=require('../controllers/blogController')
let setRouter=(app)=>{
    app.get('/helloWorld',blogController.helloWorldFunction);
    app.get('/printExample',blogController.printExample);
    app.get('/test/route/:firstName/:lastName',blogController.testRoute);
    app.get('/test/query',blogController.testQuery);
    app.post('/test/body',blogController.testBody);

}//end setRouter function
module.exports= {
    setRouter:setRouter
}