//Modules
const express = require("express")
const mongoose = require('mongoose');
const Blog = require('./models/blog');

//Initialize app
const app = express()
app.set('view engine', 'ejs')

//Connect to MongoDB
const dbURI = "mongodb+srv://Jiatao7:ZZtZX1LJLu4Xh5ou@cluster0.9ulw8.mongodb.net/new-blog-website?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(dbURI)
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

//Middleware
app.use(express.static('public'));
app.use((req, res, next) => {
    console.log(req.url)
    next()
})

//Routing
app.get("/", (req, res) => {
    res.render('index')
})

app.get("/blogs", (req, res) => {
    res.render('blogs')
})

app.get("/create", (req, res) => {
    res.render('create')
})

app.get("/about", (req, res) => {
    res.render('about')
})

