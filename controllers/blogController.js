const express=require('express');
const mongoose=require('mongoose');
const shortid=require('shortid')
const time= require('./../libs/timeLib')
const check=require('./../libs/checkLib')

const BlogModel=mongoose.model('Blog')
//  mongoose.connect('mongodb://localhost');

let helloWorldFunction=(req,res)=>res.send('Hello World')
let printExample=(req,res)=>res.send("print example");
let testRoute=(req,res)=>{ console.log(req.params); req.send(req.params);}
let testQuery=(req,res)=>{ console.log(req.query); req.send(req.query);}
let testBody=(req,res)=>{ console.log(req.body); req.send(req.body);}

let getAllBlog=(req,res)=>{
    BlogModel.find().select('-__V - _id').lean().exec((err,result)=>{
        if(err){
            console.log(err);
            logger.error(err.message,'Blog Controller:getAllBlog',10)
            let apiResponse=response.generate(true,'Failed To Find Blog Details',500,null)
            res.send(apiResponse);
        }
        else if(result == undefined || result == null || result == ''){
            console.log("No Blog Found")
            logger.info('no bog found','BLog Controller:getAllBlog')
            let apiResponse=response.generate(true,'No Blog Found',404,null)
            res.send(apiResponse)
        }
        else{
            let apiResponse=response.generate(false,'All Blog Details Found',200,result);
            res.send(apiResponse);
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
        created:time.now(),
        lastModified:time.now()
    })
    let tags=(req.body.tags!=undefined&&req.body.tags!=null&&req.body.tags!='')?req.body.tags.split(','):[] 
    newBlog.tags=tags
    newBlog.save((err,result)=>{
        if(err){
            console.log(err)
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
}
/**
 * function to read single blog.
 */
let viewByBlogId = (req, res) => {
    if(check.isEmpty(req.params.blogId)){
        console.log('blogID should be passed')
        let apiResponse= response.generate(true,'Blog is Missing',403,null)
        res.send(apiResponse);
    }
    else{
        BlogModel.findOne({ 'blogId': req.params.blogId }, (err, result) => {
            console.log("blogId should be passed");
            let apiResponse=response.generate(true,'blogId is missing',403,null)
            res.send(apiResponse);
            if (err) {
                console.log("Error Occured")
                logger.error(`Error Occured:${err}`,`Database`,10);
                let apiResponse=response.generate(true,'Error Occured',500,null)
                res.send(apiResponse)
            } else if (result == undefined || result == null || result == '') {
                console.log('No Blog Found');
                let response=response.generate(true,`Error Occured`,404,null)
                res.send(apiResponse)
            } else {
                logger.info("Blog found successfully","BlogController:viewByBlogId",5)
                let response=response.generate(false,'Blog Found Successfuly',200,result);
                res.send(apiResponse)
    
            }
        })
    }   
}
/**
 * function to read blogs by category.
 */
let viewByCategory = (req, res) => {
    if(check.isEmpty(req.params.categorygId)){
        console.log('blogID should be passed')
        let apiResponse= response.generate(true,'Blog is Missing',403,null)
        res.send(apiResponse);
    }
    else{
        BlogModel.find({ 'category': req.params.category }, (err, result) => {
            if (err) {
                logger.error(`Error Occured:${err}`,Database,10)
                let apiResponse=response.generate(true,'Error Occured',500,null)    
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                console.log('No Blog Found')
                let apiResponse=response.generate(true,'Blog Not Found',404,null)
                res.send(apiResponse);
            } else {
                let apiResponse=response.generate(false,'BlogsFound Successfully',200,result)
                res.send(apiResponse);
    
            }
        })
    }
}

/**
 * function to read blogs by author.
 */
let viewByAuthor = (req, res) => {
    if (check.isEmpty(req.params.author)) {

        console.log('author should be passed')
        let apiResponse = response.generate(true, 'author is missing', 403, null)
        res.send(apiResponse)
    }
    else{
        BlogModel.find({ 'author': req.params.author }, (err, result) => {

            if (err) {
                console.log("Error Occured");
                logger.error(`Error Occured ${err}`,'Database',10)
                let apiResponse=response.generate(true,'Error Occured',500,null)
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {
                console.log('No Blog Found')
                let apiResponse=response.generate(true,'BLogs Not Found',404,null)
                res.send(apiResponse)
            } else {
                console.log("Blogs Found Successfully")
                let apiResponse=response.generate(false,'BLogs Found Successfully',200,result);
                res.send(apiResponse);
    
            }
        })

    }

    
}
/**
 * function to edit blog by admin.
 */
let editBlog = (req, res) => {

    if (check.isEmpty(req.params.blogId)) {

        console.log('blogId should be passed')
        let apiResponse = response.generate(true, 'blogId is missing', 403, null)
        res.send(apiResponse)
    } else {

        let options = req.body;
        console.log(options);
        BlogModel.update({ 'blogId': req.params.blogId }, options, { multi: true }).exec((err, result) => {

            if (err) {

                console.log('Error Occured.')
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {

                console.log('Blog Not Found.')
                let apiResponse = response.generate(true, 'Blog Not Found', 404, null)
                res.send(apiResponse)
            } else {
                console.log('Blog Edited Successfully')
                let apiResponse = response.generate(false, 'Blog Edited Successfully.', 200, result)
                res.send(apiResponse)
            }
        })
    }
}
/**
* function to find the assignment.
*/
let findBlogToEdit = (blogId) => {

		if (check.isEmpty(req.params.blogId)) {

			console.log('blogId should be passed')
			let apiResponse = response.generate(true, 'blogId is missing', 403, null)
			reject(apiResponse)
		} else {
			return new Promise((resolve, reject) => {
				BlogModel.findOne({ 'blogId': req.params.blogId }, (err, blog) => {
					if (err) {
						console.log('Error Occured.')
						logger.error(`Error Occured : ${err}`, 'Database', 10)
						let apiResponse = response.generate(true, 'Error Occured.', 500, null)
						reject(apiResponse)
					} else if (check.isEmpty(blog)) {
						console.log('Blog Not Found.')
						let apiResponse = response.generate(true, 'Blog Not Found', 404, null)
						reject(apiResponse)
					} else {
						console.log('Blog Found.')
						resolve(blog)
					}
				})
			})
		}
}
/**
 * function to delete the assignment collection.
 */
let deleteBlog = (req, res) => {

    if (check.isEmpty(req.params.blogId)) {

        console.log('blogId should be passed')
        let apiResponse = response.generate(true, 'blogId is missing', 403, null)
        res.send(apiResponse)
    } else {

        BlogModel.remove({ 'blogId': req.params.blogId }, (err, result) => {
            if (err) {
                console.log('Error Occured.')
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                console.log('Blog Not Found.')
                let apiResponse = response.generate(true, 'Blog Not Found.', 404, null)
                res.send(apiResponse)
            } else {
                console.log('Blog Deletion Success')
                let apiResponse = response.generate(false, 'Blog Deleted Successfully', 200, result)
                res.send(apiResponse)
            }
        })
    }
}
/**
 * function to increase views of a blog.
 */
let increaseBlogView = (req, res) => {
    
    if (check.isEmpty(req.params.blogId)) {

        console.log('blogId should be passed')
        let apiResponse = response.generate(true, 'blogId is missing', 403, null)
        res.send(apiResponse)
    } else {

        BlogModel.findOne({ 'blogId': req.params.blogId }, (err, result) => {

            if (err) {

                console.log('Error Occured.')
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {

                console.log('Blog Not Found.')
                let apiResponse = response.generate(true, 'Blog Not Found', 404, null)
                res.send(apiResponse)
            } else {
                result.views += 1;
                result.save(function(err,result){
                    if(err){
                        console.log('Error Occured.')
                        logger.error(`Error Occured : ${err}`, 'Database', 10)
                        let apiResponse = response.generate(true, 'Error Occured While saving blog', 500, null)
                        res.send(apiResponse)
                    }
                    else{
                        console.log('Blog Updated Successfully')
                        let apiResponse = response.generate(false, 'Blog Updated Successfully.', 200, result)
                        res.send(apiResponse)
                    }
                });// end result
                
            }
        })
    }
}
module.exports={
    helloWorldFunction:helloWorldFunction,
    printExample:printExample,
    testBody:testBody,
    testQuery:testQuery,
    testRoute:testRoute,
    getAllBlog: getAllBlog,
    createBlog: createBlog,
    viewByBlogId: viewByBlogId,
    viewByCategory: viewByCategory,
    viewByAuthor: viewByAuthor,
    editBlog: editBlog,
    deleteBlog: deleteBlog,
    increaseBlogView : increaseBlogView
}