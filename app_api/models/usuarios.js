var mongoose = require('mongoose');

var usuariosSchema = new mongoose.Schema({
  nombre: {type: String, required: true},
  apellido: {type: String, required: true},
  rut: {type: String, required: true},
  email: {type: String, required: true},
  telefono: Number,
  asignaturas: [String],
  actividades: [String]
});

mongoose.model('Usuarios', usuariosSchema);
