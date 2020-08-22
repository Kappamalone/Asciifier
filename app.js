const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const fileupload = require('express-fileupload')
let {PythonShell} = require('python-shell');
const { promises } = require('fs');

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
    function runPythonScript(){
        return new Promise((resolve,reject) => {
            const pythonScript = path.join(__dirname,'pythonFiles','asciify.py')
            let options = {args: [filePath,asciiSize]}
            const pythonExecute = PythonShell.run(pythonScript,options,(error,results) => {
                if (error) {
                    console.log(error)
                    res.sendStatus(500);
                    reject(error);
                }
                console.log('Executing python script');
                resolve(results[0]);
            })
        })
    }

    async function sendAscii(){
        try {
            executePromise = await runPythonScript();
            console.log('sending!');

            if (executePromise == '1') {
                let output = path.join(__dirname,'pythonFiles','output.txt')
                res.download(output,'ascii.txt',(err) => {
                    if (err){
                        console.log(err);
                    } else {
                        console.log('sent!!!!!!!!!!');
                    }
                })
                res.sendStatus(200);
                console.log('status sent');
            }
        } catch (err) {
            console.log(err)
        };
    }

    //return the output.txt file to the user
    sendAscii()
})

app.listen(port,() => {
    console.log('Listening at port ' + port)
})