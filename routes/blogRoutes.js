const express= require('express')
const blogController=require('../controllers/blogController')
const appConfig=require('./../config/appConfig')
const auth = require("./../middlewares/auth")

let setRouter=(app)=>{
    let baseUrl=appConfig.apiVersion+'/blogs';
    app.get('/helloWorld',blogController.helloWorldFunction);
    /**
     * @api{get} localhost:3000/ Get all Blogs
     * @apiVersion 0.0.1
     * @apiGroup read
     * 
     * @apiParam {String} Just a Hello World Function 
     *
    */
    
    app.get('/printExample',blogController.printExample);
    /**
     * @api{get} localhost:3000/ Get all Blogs
     * @apiVersion 0.0.1
     * @apiGroup read
     * 
     * @apiParam {String} Just a Print Example Function 
     *
    */
    app.get('/test/route/:firstName/:lastName',blogController.testRoute);
    /**
     * @api{get} localhost:3000/ Get all Blogs
     * @apiVersion 0.0.1
     * @apiGroup read
     * 
     * @apiParam {String} Just a Test Route Function 
     *
    */
    app.get('/test/query',blogController.testQuery);
    /**
     * @api{get} localhost:3000/ Get all Blogs
     * @apiVersion 0.0.1
     * @apiGroup read
     * 
     * @apiParam {String} Just a Test Query Function
     *
    */
    app.get(baseUrl+'/all',auth.isAuthenticated,blogController.getAllBlog);
    /**
     * @api{get} /api/v1/blogs/all Get all Blogs
     * @apiVersion 0.0.1
     * @apiGroup read
     * 
     * @apiParam {String} authToken The token for authentication.( Send authToken as query parameter, body parameter,body parameter or as a header)
     * 
     * @api SuccessExample {json} Success-Response
     * {
     * "error":false,
     * "message":"All Blog Details Found",
     * "status":200,
     * "data":[{
     *        blogId: "string",
     *        title: "string",
     *        description:"string",
     *        bodyHtml:"string",
     *        author:"string",
     *        tags:object(type=array),
     *        created:"date",
     *        lastModified:"date"
     *     }]
     *  }
     * }
     * }
     * @apiErrorExample {json} Error-Response:
	 *
	 * {
	 *  "error": true,
	 *  "message": "Failed To Find Blog Details",
	 *   "status": 500,
	 *   "data": null
	 *  }
	 *
    */
    app.get(baseUrl+'/view/:blogId',auth.isAuthenticated,blogController.viewByBlogId);
    /**
     * @api{get} /api/v1/blogs/view/:blogId Get a Single Blog
     * @apiVersion 0.0.1
     * @apiGroup read
     * 
     * @apiParam {String} authToken The token for authentication.( Send authToken as query parameter, body parameter,body parameter or as a header)
     * @apiParam {String} blogId The Blog Id should be passed as the URL parameter
     * 
     * @api SuccessExample {json} Success-Response
     * {
     * "error":false,
     * "message":"Blog Found Successfully",
     * "status":200,
     * "data":[{
     *        _id: "string"
     *        _v: "string"
     *        blogId: "string",
     *        title: "string",
     *        description:"string",
     *        bodyHtml:"string",
     *        views:number,
     *        isPublished:boolean,
     *        category:"string"
     *        author:"string",
     *        tags:object(type=array),
     *        created:"date",
     *        lastModified:"date"
     *     }]
     *  }
     * }
     * }
     * @apiErrorExample{json} Error-response
     * {
     *   "error":"true",
     *   "message":"Error Occured",
     *   "status": 500,
     *   "data": null 
     * }
    */
    app.get(baseUrl+'/view/by/author/:author',auth.isAuthenticated,blogController.viewByAuthor);
    /**
     * @api{get} /api/v1/blogs/view/by/author/:author Get blogs by author
     * @apiVersion 0.0.1
     * @apiGroup read
     * 
     * @apiParam {String} authToken The token for authentication.( Send authToken as query parameter, body parameter,body parameter or as a header)
     * @apiParam {String} author The Author name should be passed as the URL parameter
     * 
     * @api SuccessExample {json} Success-Response
     * {
     * "error":false,
     * "message":"Blog Found Successfully",
     * "status":200,
     * "data":[{
     *        blogId: "string",
     *        title: "string",
     *        description:"string",
     *        bodyHtml:"string",
     *        views:number,
     *        isPublished:boolean,
     *        category:"string"
     *        author:"string",
     *        tags:object(type=array),
     *        created:"date",
     *        lastModified:"date"
     *     }]
     *  }
     * }
     * }
     * @apiErrorExample{json} Error-response
     * {
     *   "error":"true",
     *   "message":"Error Occured",
     *   "status": 500,
     *   "data": null 
     * }
    */
    app.get(baseUrl+'/view/by/category/:category',auth.isAuthenticated,blogController.viewByCategory);
    /**
     * @api{get} /api/v1/blogs/view/by/category/:category Get all Blogs by category
     * @apiVersion 0.0.1
     * @apiGroup read
     * 
     * @apiParam {String} authToken The token for authentication.( Send authToken as query parameter, body parameter,body parameter or as a header)
     * @apiParam {String} category The category of the blog should be passed as the URL parameter
     * 
     * @api SuccessExample {json} Success-Response
     * {
     * "error":false,
     * "message":"Blog Found Successfully",
     * "status":200,
     * "data":[{
     *        blogId: "string",
     *        title: "string",
     *        description:"string",
     *        bodyHtml:"string",
     *        views:number,
     *        isPublished:boolean,
     *        category:"string"
     *        author:"string",
     *        tags:object(type=array),
     *        created:"date",
     *        lastModified:"date"
     *     }]
     *  }
     * }
     * }
     * @apiErrorExample{json} Error-response
     * {
     *   "error":"true",
     *   "message":"Error Occured",
     *   "status": 500,
     *   "data": null 
     * }
    */
    app.get(baseUrl+'/:blogId/delete',auth.isAuthenticated,blogController.deleteBlog);
    /**
	 * @api {post} /api/v1/blogs/:blogId/delete Delete blog by blogId
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} blogId blogId of the blog passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blog Deleted Successfully",
	    "status": 200,
	    "data": []
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

    app.get(baseUrl+'/:blogId/edit',blogController.editBlog);
    /**
	 * @api {put} /api/v1/blogs/:blogId/edit Edit blog by blogId
	 * @apiVersion 0.0.1
	 * @apiGroup edit
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} blogId blogId of the blog passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blog Edited Successfully.",
	    "status": 200,
	    "data": [
					{
						blogId: "string",
						title: "string",
						description: "string",
						bodyHtml: "string",
						views: number,
						isPublished: boolean,
						category: "string",
						author: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */
    app.get(baseUrl+'/create',auth.isAuthenticated,blogController.createBlog);
    /**
	 * @api {post} /api/v1/blogs/create Create blog
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} title title of the blog passed as a body parameter
	 * @apiParam {String} description description of the blog passed as a body parameter
	 * @apiParam {String} blogBody blogBody of the blog passed as a body parameter
	 * @apiParam {String} category category of the blog passed as a body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blog Created successfully",
	    "status": 200,
	    "data": [
					{
						blogId: "string",
						title: "string",
						description: "string",
						bodyHtml: "string",
						views: number,
						isPublished: boolean,
						category: "string",
						author: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */
    app.get(baseUrl+'/:blogId/count/view',auth.isAuthenticated,blogController.increaseBlogView);
    /**
	 * @api {get} /api/v1/blogs/:blogId/count/view Increase Blogs Count
	 * @apiVersion 0.0.1
	 * @apiGroup update
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} blogId blogId of the blog passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blog Updated Successfully.",
	    "status": 200,
	    "data": [
					{
						blogId: "string",
						title: "string",
						description: "string",
						bodyHtml: "string",
						views: number,
						isPublished: boolean,
						category: "string",
						author: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */
    


    app.post('/test/body',blogController.testBody);
    /**
     * @api{get} localhost:3000/ Get all Blogs
     * @apiVersion 0.0.1
     * @apiGroup read
     * 
     * @apiParam {String} Just a Test Body Function 
     *
    */


}//end setRouter function
module.exports= {
    setRouter:setRouter
}