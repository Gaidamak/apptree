var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')

var app = express()

app.use(express.static('./'))
app.use(bodyParser.json())

app.post('/save', function (req, res) {
   writeFile(req.body.json);
   res.send(req.body);
})

app.get('*', function (req, res) {
   next()
})

function writeFile (data) {
    fs.writeFile("./data.json", data, function(err) {
      if(err) {
          return console.log(err);
      }

      console.log("The file was saved!");
    });
}

app.listen(3333, 'localhost', function (err, result) {
    if (err) {
        console.log(err);
    }

    console.log('Listening at localhost:3333');
})
