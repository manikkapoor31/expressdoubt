const express= require('express')
let setRouter=(app)=>{
    let helloWorldFunction=(req,res)=>res.send('Hello World')
    app.get('/hello-world',helloWorldFunction)

    let printExample=(req,res)=>res.send("print example");

}//end setRouter function
module.exports= {
    setRouter:setRouter
}