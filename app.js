const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')

const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use(express.static('public'))


app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'/index.html'))
})

app.post('/fileUpload',(req,res) => {
    console.log(req[1])
    console.log('recieved!')
})

app.listen(port,() => {
    console.log('Listening at port ' + port)
})