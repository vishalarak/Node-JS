const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const port = 3001;

// Use the express-fileupload middleware
app.use(fileUpload());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/api/upload', (req, res) => {
    // Log the files to the console
    console.log(req.files);
    const { image } = req.files;

    // If no image submitted, exit
    if (!image) return res.sendStatus(400);

    // Move the uploaded image to our upload folder
    image.mv(__dirname + '/public/images/' + image.name);

    // All good
   // res.sendStatus(200);
   res.send(image.name);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});




/*
var express = require('express')
var multer  = require('multer')
var port = 3001;

var app = express()

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    }
   
})
var upload = multer({ storage: storage });


app.use(express.static(__dirname + '/public'));
app.use('/images', express.static('images'));

app.post('/api/upload', upload.single('image'), function (req, res, next){

    res.send("file uploaded"+req.file.originalname);
  
})
app.listen(port,() => console.log(`Server running on port ${port}!`))

*/