var express = require('express');
var router = express.Router();
var controladorVista = require('../controllers/usuarios');

/* GET home page. */
router.get('/', controladorVista.paginaPrincipal);

module.exports = router;
