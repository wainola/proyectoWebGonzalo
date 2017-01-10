var mongoose = require('mongoose');
var Users = mongoose.model('Usuarios');

var enviarRespuestaJson = function(res, status, content){
  res.status(status);
  res.json(content);
};

module.exports.lecturaUsuario = function(req, res){
  if(req.params && req.params.usuarioid){
    // Notar que estamos usando la manera callback para llamar la informacion en vez de utilizar el metodo exec que devuelve una promesa.
    Users
      .findById(req.params.usuarioid, function(err, user){
        if(!user){
          enviarRespuestaJson(res, 404, {"message": "usuarioid no encontrado"});
          return;
        } else if (err){
          enviarRespuestaJson(res, 404, err);
          return;
        }
        enviarRespuestaJson(res, 200, user);
      });
  } else {
    enviarRespuestaJson(res, 404, {"message": "No ingreso usuarioid en la url"});
  }
};

// Añadimos usuario.
module.exports.addUsuario = function(req, res){
  Users
    .create({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      telefono: req.body.telefono,
      ramos: req.body.ramos.split(',')
    }, function(err, user){
      if(err){
        enviarRespuestaJson(res, 400, err);
      } else {
        enviarRespuestaJson(res, 201, user);
      }
    });
};

module.exports.actualizacionUsuario = function(req, res){
  if(!req.params.usuarioid){
    enviarRespuestaJson(res, 404, {"message": "usuario id es requerido"});
    return;
  }
  Users
    .findById(req.params.usuarioid, function(err, user){
      if(!user){
        enviarRespuestaJson(res, 404, {"message": "usuarioid no encontrado"});
        return;
      } else if(err){
        enviarRespuestaJson(res, 400, err);
        return;
      }
      user.nombre = req.body.nombre;
      user.apellido = req.body.apellido;
      user.telefono = req.body.telefono;
      user.ramos = req.body.ramos.split(',');
      user.save(function(err, user){
        if(err){
          enviarRespuestaJson(res, 404, err);
        } else {
          enviarRespuestaJson(res, 200, user);
        }
      });
    });
};
module.exports.borrarUno = function(req, res){
  var usuarioid = req.params.usuarioid;
  if(usuarioid){
    Users
      .findByIdAndRemove(usuarioid, function(err, user){
        if(err){
          enviarRespuestaJson(res, 404, err);
          return;
        }
        enviarRespuestaJson(res, 204, null);
      });
  } else {
    enviarRespuestaJson(res, 404, {"message": "No ingreso usuarioid"});
  }
};
