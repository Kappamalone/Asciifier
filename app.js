const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const fileupload = require('express-fileupload')
let fs = require('fs')
let {PythonShell} = require('python-shell');

const app = express();
const port = 3000;

global.fileName;

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
    fileName = req.files.fileInput.name;
    const filePath = path.join(__dirname,'pythonFiles',fileName);
    
    //attempts to save image
    image.mv(filePath, (error) => {
        if (error){
            console.log(error);
            res.sendStatus(500)
            res.end()
        }
    })

    //runs python script on uploaded image
    function runPythonScript(){
        return new Promise((resolve,reject) => {
            const pythonScript = path.join(__dirname,'pythonFiles','asciify.py')
            let options = {args: [filePath,asciiSize]}
            const pythonExecute = PythonShell.run(pythonScript,options,(error,results) => {
                if (error) {
                    console.log(error)
                    reject(error);
                }
                console.log('Executing python script');
                resolve(results);
            })
        })
    }

    async function sendAscii(){
        try {
            executePromise = await runPythonScript();
            fs.unlinkSync(filePath)
            console.log('sending! and deleting file');

            if (executePromise) {
                res.sendStatus(200)
                console.log('status sent');
            } else {
                console.log('we screwed tonight bois')
            }
        } catch (err) {
            res.sendStatus(500)
            console.log(err)
        };
    }

    //return the output.txt file to the user and delete image
    sendAscii()
})

app.get('/fileDownload',(req,res) => {
    let output = path.join(__dirname,'pythonFiles','output.txt')
    fileName = fileName.replace(/\.[^/.]+$/, ".txt")
    res.download(output,fileName)
})

app.listen(port,() => {
    console.log('Listening at port ' + port)
})