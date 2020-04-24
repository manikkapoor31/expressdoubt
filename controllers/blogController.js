const express=require('express');
const mongoose=require('mongoose');

const BlogModel=mongoose.model('Blog')

let helloWorldFunction=(req,res)=>res.send('Hello World')
let printExample=(req,res)=>res.send("print example");
let testRoute=(req,res)=>{ console.log(req.params); req.send(req.params);}
let testQuery=(req,res)=>{ console.log(req.query); req.send(req.query);}
let testBody=(req,res)=>{ console.log(req.body); req.send(req.body);}

module.exports={
    helloWorldFunction:helloWorldFunction,
    printExample:printExample,
    testBody:testBody,
    testQuery:testQuery,
    testRoute:testRoute
}