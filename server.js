const express = require("express");
const app = express();
var bodyParser = require('body-parser');


app.set('view engine', 'ejs');
app.use(express.static( "public" ) );
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use('/', require('./routes/pages'));


app.listen(7000, () => {
  console.log("Network node started");
})
