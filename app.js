//Modules
const express = require("express")

//Initialize app
const app = express()
app.listen(3000)

app.set('view engine', 'ejs')

app.use((req, res, next) => {
    console.log(req.url)
    next()
})

app.get("/", (req, res) => {
    res.render('index')
})


