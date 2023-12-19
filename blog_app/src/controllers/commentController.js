const User = require("../models/user");
const Comment = require("../models/comment");
const Post = require("../models/post");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");


// create a Comment
exports.create_comment_post = [
    // Validate and sanitize fields.
    body("name", "name must not be empty.")
    .trim()
    .isLength({ min: 2 })
    .escape(),
    body("text", "text must not be empty.")
    .trim()
    .isLength({ min: 5 })
    .escape(),


    // Process request after validation and sanitization.
asyncHandler( async (req, res, next) => {
   const errors = validationResult(req);
   
   if (!errors.isEmpty()) {

         // Store the errors in the flash messages
         errors.array().forEach((error) => {
           req.flash('error', error.msg);
         });
        console.log(req.body)
         console.log(errors)
         res.send(errors)
       };
       try {
           const comment = new Comment({
             
             name: req.body.name,
             text: req.body.text,
             post: req.params.id
               
           });
           const result = await comment.save();
           res.status(201).send({ message: 'Comment created successfully', comment: result });
    
         } catch(err) {
           return next(err);
         };
 
})

];



// Get list of all comments of a Post.
exports.comment_list = asyncHandler(async (req, res, next) => {

  const post = req.params.id

  const allComments = await Comment.find({ "post": post}, "name text timestamp")
    .sort({ timestamp: 1 })
    .populate("name")
    .populate("text")
    .exec();
  

  res.send(allComments);
});