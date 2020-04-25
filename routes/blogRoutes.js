const express= require('express')
const blogController=require('../controllers/blogController')
const appCongfig=require("./../config/appConfig")

let setRouter=(app)=>{
    const baseUrl=appConfig.apiVersion+'/blogs';
    app.get('/helloWorld',blogController.helloWorldFunction);
    app.get('/printExample',blogController.printExample);
    app.get('/test/route/:firstName/:lastName',blogController.testRoute);
    app.get('/test/query',blogController.testQuery);
    app.get(baseUrl+'/all',blogController.getAllBlog);
    app.get(baseUrl+'/all',blogController.viewByBlogId);
    app.get(baseUrl+'/all',blogController.viewByAuthor);
    app.get(baseUrl+'/all',blogController.viewByCategory);
    app.get(baseUrl+'/all',blogController.deleteBlog);
    app.get(baseUrl+'/all',blogController.editBlog);
    app.get(baseUrl+'/all',blogController.createBlog);
    app.get(baseUrl+'/all',blogController.increaseBlogView);
    app.post('/test/body',blogController.testBody);


}//end setRouter function
module.exports= {
    setRouter:setRouter
}