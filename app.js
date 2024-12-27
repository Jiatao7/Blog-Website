//Modules
const express = require("express")
const mongoose = require('mongoose');
const Blog = require('./models/blog');
require('dotenv').config()

//Initialize app
const app = express()
app.set('view engine', 'ejs')

//Connect to MongoDB
const dbURI = process.env.dbURI;

mongoose.connect(dbURI)
  .then(result => app.listen(process.env.PORT))
  .catch(err => console.log(err));

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(req.url)
    next()
})

//Routing
app.get("/", (req, res) => {
    Blog.find().sort({createdAt: -1})
    .then(result => res.render('index', {blogs: result}))
})

app.get("/blogs", (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then(result => res.render('blogs', {blogs: result}))
})

app.get("/blogs/:id", (req, res) => {
    const blogID = req.params.id;
    Blog.findById(blogID)
        .then(result => res.render("details", result))
    
})

app.get("/create", (req, res) => {
    res.render('create')
    /*
    const blog = new Blog({
        title: 'new blog',
        description: 'about my new blog',
        body: 'more about my new blog'
    })
    
    blog.save()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
    */
})

app.get("/about", (req, res) => {
    res.render('about')
})

app.post("/blogs", (req, res) => {
    const newBlog = new Blog(req.body)
    newBlog.save()
        .then(result => {
            console.log(result)
            res.redirect("/blogs")
        })
})

