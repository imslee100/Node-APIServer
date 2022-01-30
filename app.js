const express = require('express')
const morgan = require('morgan')
const users = require('./db/users')
const app = express()

function logger(req, res, next){
    console.log('i am logger')
    next()
}

app.use(logger)
app.use(morgan('dev'))

app.listen(3000, function(){
    console.log('Server is running')
})

app.get('/users', function(req, res){
    res.json(users)
})