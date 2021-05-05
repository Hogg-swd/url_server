const express = require("express");
const app = express();
var bodyParser = require('body-parser');


app.set('view engine', 'ejs');
app.use(express.static( "public" ) );
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use('/', require('./routes/pages'));


port = process.env.port || 3000
app.listen(port, () => {
  console.log("Network node started");
})
