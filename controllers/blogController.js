const express=require('express');
const mongoose=require('mongoose');

const BlogModel=mongoose.model('Blog')
mongoose.connect('mongodb://localhost');

let helloWorldFunction=(req,res)=>res.send('Hello World')
let printExample=(req,res)=>res.send("print example");
let testRoute=(req,res)=>{ console.log(req.params); req.send(req.params);}
let testQuery=(req,res)=>{ console.log(req.query); req.send(req.query);}
let testBody=(req,res)=>{ console.log(req.body); req.send(req.body);}

let getAllBlog=(req,res)=>{
    BlogModel.find().select('-__V - _id').lean().exec((err,result)=>{
        if(err){
            console.log(err);
            res.send(err)
        }
        else if(result == undefined || result == null || result == ''){
            console.log("No Blog Found")
            res.send("No Blog Found")
        }
        else{
            res.send(result)
        }
    })
}
let createBlog=(req,res)=>{
    var today =Date.now()
    let blogId=shortid.generate()
    let newBlog=new BlogModel({
        blogId:blogId,
        title:req.body.title,
        description:req.body.blogBody,
        isPublished:true,
        category:req.body.category,
        author:req.body.fullName,
        crea
    })
}

module.exports={
    helloWorldFunction:helloWorldFunction,
    printExample:printExample,
    testBody:testBody,
    testQuery:testQuery,
    testRoute:testRoute
}