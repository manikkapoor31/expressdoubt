const express= require('express')
const blogController=require('./../controllers/blogController')
let setRouter=(app)=>{
    app.get('/helloWorld',blogController.helloWorld);
    app.get('/printExample',blogController.printExample);

}//end setRouter function
module.exports= {
    setRouter:setRouter
}