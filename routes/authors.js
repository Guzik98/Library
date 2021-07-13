const express = require('express')
const author = require('../models/author')
const router = express.Router()
const Author = require('../models/author')



//Sciezka do wszystkich autorow
router.get(('/'), async (req,res)=>{
    let searchOptions = {}
    if(req.query.name !==null && req.query.name !==''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try{
        const authors = await Author.find(searchOptions)
        res.render('authors/index',{
            authors: authors,
            searchOptions: req.query
        })
    } catch{
        res.rediredct('/')
    } 
})

//nowy author 
router.get(('/new'),(req, res)=>{
    res.render('authors/new',{author: new Author() })
})

//tworzenie authora
router.post(('/'),async (req,res)=>{
    const author = new Author({
    name: req.body.name //zeby nie pobrac przypadkowej wartosc
    })
    try{
        const newAuthor = await author.save()
        //res.redirect('authors/%{newAuthor.id}')
        res.redirect('authors')
    }catch{
        res.render('authors/new', {
        author: author,
        errorMessage: 'Error creating Author'
        })
    }
})



module.exports = router