var express = require('express');
var app = express();

app.use(express.static(__dirname));
// respond with "hello world" when a GET request is made to the homepage
app.get('/*', function(req, res) {
  res.redirect("index.html");
});



app.listen(3000);


