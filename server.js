const express = require('express')

const app = express()
app.use(express.static('src'))
app.get('/', (req, res) => {
    res.send('src/index.html')
})
app.get('/test', (req, res) => {
    res.send('test Hello')
})

module.exports = app