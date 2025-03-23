//Modules
const express = require("express")
const mongoose = require('mongoose');
const path = require('path');
const Blog = require('./models/blog')
const blogRoutes = require('./routes/blogRoutes');
require('dotenv').config()

//Initialize app
const app = express()
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

//Connect to MongoDB
const dbURI = process.env.dbURI;

mongoose.connect(dbURI)
  .then(result => app.listen(process.env.PORT))
  .catch(err => console.log(err));

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    next()
})

//Routing
app.get("/", (req, res) => {
    Blog.find().sort({createdAt: -1})
    .then(result => res.render('index', {blogs: result}))
})

app.get("/about", (req, res) => {
    res.render('about')
})

app.use("/blogs", blogRoutes)

//404 page
app.use((req, res) => {
    res.render('404')
})
