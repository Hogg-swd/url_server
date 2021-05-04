const express = require('express');
const router = express.Router();
const mysql = require('mysql')
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var urls = [];

dotenv.config({path: './.env'});

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

//create helper to get res.body of the chain into a useable form

router.get('/', (req, res) => {
  db.query('SELECT * FROM urls', (err, resp) => {
        if(err){
          console.log(err);
          res.render('index', {urls : "failed"});
        } else {
          urls = resp
          res.render('index', {urls : resp});
        }
      });
});

router.get('/urls', (req, res) =>{
  db.query('SELECT * FROM urls', (err, resp) => {
        if(err){
          console.log(err);
          res.send({errmsg : "Failed to grab urls"});
        } else {
          packet = []
          urls = resp
          for (var i = 0; i < urls.length; i++){packet.push(urls[i].url)}
          res.send(packet)
        }
      });
})

router.post('/urls', (req, res) => {
  console.log(req.body.url)
  let pad = "'"
  db.query('INSERT INTO `urls` (`url`, `public_key`) VALUES (' + pad + req.body.url + pad + ',' + pad + req.body.pk + pad + ');',(err, resp) => {
        if(err){
          console.log(err);
          res.redirect('/')
        } else {
          res.redirect('/');
        }
      });
});



module.exports = router;
