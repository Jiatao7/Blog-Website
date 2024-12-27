//Modules
const express = require("express")

//Initialize app
const app = express()
app.listen(3000)
app.set('view engine', 'ejs')
app.use(express.static('public'));

app.use((req, res, next) => {
    console.log(req.url)
    next()
})

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

