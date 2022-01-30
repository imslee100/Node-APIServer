const express = require('express')
const morgan = require('morgan')
let users = require('./db/users')
const app = express()

function logger(req, res, next){
    // console.log('i am logger')
    next()
}

app.use(logger)
app.use(morgan('dev'))

app.listen(3000, function(){
    // console.log('Server is running')
})

app.get('/users', function(req, res){
    req.query.limit = req.query.limit || 10
    const limit = parseInt(req.query.limit, 10)

    if(Number.isNaN(limit)) {
        return res.status(400).end()
    }

    res.json(users.slice(0,limit))
})

app.get('/users/:id', function(req, res){
    const id = parseInt(req.params.id,10)
    if(Number.isNaN(id)) return res.status(400).end()
    
    const user = users.filter((user) => user.id === id)[0]
    if(!user) return res.status(404).end()
    res.json(user)
})

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();
  
    users = users.filter(user=> user.id !== id);
    res.status(204).end();
  });

module.exports = app;