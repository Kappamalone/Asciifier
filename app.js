const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const fileupload = require('express-fileupload')

const app = express();
const port = 3000;

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}))
app.use(express.static('public'))
app.use(fileupload())


app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'/index.html'))
})

app.post('/fileUpload',(req,res) => {
    console.log(req.files)
})

app.listen(port,() => {
    console.log('Listening at port ' + port)
})