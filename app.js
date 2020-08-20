const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const fileupload = require('express-fileupload')
let {PythonShell} = require('python-shell')

const app = express();
const port = 3000;

//setting up middleware
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));
app.use(express.static('public'));
app.use(fileupload());

//routing
app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'/index.html'));
})

//handling POSTS with image files
app.post('/fileUpload',(req,res) => {
    //beware of the difference between .files and .body

    const image = req.files.fileInput;
    const asciiSize = req.body.asciiSize;
    const fileName = req.files.fileInput.name;
    const filePath = path.join(__dirname,'pythonFiles',fileName);
    
    //attempts to save image
    image.mv(filePath, (error) => {
        if (error){
            console.log(error);
            res.sendStatus(500)
        }
    })

    //runs python script on uploaded image
    const pythonScript = path.join(__dirname,'pythonFiles','asciify.py')
    let options = {
        args: [filePath,asciiSize]
    }
    PythonShell.run(pythonScript,options,(error,results) => {
        if (error) {
            console.log(error)
            res.sendStatus(500)
        }
        console.log(results[0])
    })

    //return the output.txt file to the user

    res.sendStatus(200)
    console.log('status sent')
})

app.listen(port,() => {
    console.log('Listening at port ' + port)
})