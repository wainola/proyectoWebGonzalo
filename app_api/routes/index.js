var express = require('express');
var router = express.Router();
var controladorUsuarios = require('../controllers/usuarios.js');

// Usuarios.
router.get('/usuarios/:usuarioid', controladorUsuarios.lecturaUsuario);
router.get('/usuarios', controladorUsuarios.listaUsuarios);
router.post('/usuarios', controladorUsuarios.addUsuario);
router.put('/usuarios/:usuarioid', controladorUsuarios.actualizacionUsuario);
router.delete('/usuarios/:usuarioid', controladorUsuarios.borrarUno);

module.exports = router;
