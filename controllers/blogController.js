const express = require('express');
const Blog = require('../models/blog');

const all_blogs = (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then(result => res.render('blogs', {blogs: result}))
}

const new_blog = (req, res) => {
    res.render('create')
}

const blog_create = (req, res) => {
    const newBlog = new Blog(req.body)
    newBlog.save()
        .then(result => {
            //console.log(result)
            res.redirect("/blogs")
        })
}

const blog_details = (req, res) => {
    const blogID = req.params.id;
    Blog.findById(blogID)
        .then(result => res.render("details", result))
    
}

const blog_delete = (req, res) => {
    const id = req.params.id
    Blog.findByIdAndDelete(id)
        .then(result => res.json())
        .catch(err => {console.log(err)});
}

module.exports = {all_blogs, new_blog, blog_create, blog_details, blog_delete}