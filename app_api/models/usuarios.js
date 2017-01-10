var mongoose = require('mongoose');

var usuariosSchema = new mongoose.Schema({
  nombre: {type: String, required: true},
  apellido: {type: String, required: true},
  telefono: Number,
  ramos: [String]
});

mongoose.model('Usuarios', usuariosSchema);
