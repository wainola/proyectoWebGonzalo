var express = require('express');
var router = express.Router();
var controladorVista = require('../controllers/usuarios');

/* GET home page. */
router.get('/', function(req, res){
  res.render('index');
});
router.get('/home', function(req, res){
  res.render('home');
})
module.exports = router;
