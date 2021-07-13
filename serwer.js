if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express') //get express z biblioteki express
const app = express()
const expressLayouts = require("express-ejs-layouts")//get layout z biblioteki express layout

const indexRouter = require('./routes/index')//odniesienie do pliku

app.set('view engine', 'ejs') //view engine
app.set('views', __dirname +'/views') //views znajduje sie tym katalogu + views
app.set('layout', 'layouts/layout')//gdzie znajduje sie nasz layoyut file kazdy plik html bedzie znajdowal sie w layout file
app.use(expressLayouts)
app.use(express.static('public'))

//database connection
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true  })
const db = mongoose.connection
db.on('error', error=>{console.error(error) }) //kiedy wystawi blad
db.once('open',()=> console.log("connected to database"))//przy odapleniu apki

app.use('/', indexRouter)//uzywamy pliku

app.listen(process.env.PORT || 3000) //serwer powie jaki port nasluchuje ale narazie ustawiamy recznie na 3000

