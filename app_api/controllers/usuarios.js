var mongoose = require('mongoose');
var Users = mongoose.model('Usuarios');

var enviarRespuestaJson = function(res, status, content){
  res.status(status);
  res.json(content);
};

/* Ver el tema del acceso al listado de usuarios, que se hace sin una especie de llave. Dejar pendiente*/
module.exports.listaUsuarios = function(req, res){
  Users
    .find(function(err, users){
      if(err){
        enviarRespuestaJson(res, 404, err);
      } else if (!users){
        enviarRespuestaJson(res, 404, {'mensaje': "no hay usuarios en el registro"});
      } else {
        enviarRespuestaJson(res, 200, users);
      }
    });
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

module.exports.addUsuario = function(req, res){
  Users
    .create({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      rut: req.body.rut,
      email: req.body.email,
      telefono: req.body.telefono,
      asignaturas: req.body.asignaturas.split(','),
      actividades: req.body.actividades.split(',')
    }, function(err, user){
      if(err){
        console.log('Error al crear usuario');
        enviarRespuestaJson(res, 400, err);
      } else {
        console.log('Usuario creado \n' + user);
        enviarRespuestaJson(res, 201, user);
      }
    });
};

module.exports.actualizacionUsuario = function(req, res){
  if(!req.params.usuarioid){
    console.log('Id de usuario es requerido');
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
      user.rut = req.body.rut;
      user.email = req.body.email;
      user.telefono = req.body.telefono;
      user.asignaturas = req.body.asignaturas.split(',');
      user.actividades = req.body.actividades.split(',');
      user.save(function(err, user){
        if(err){
          console.log('No pudo ser guardado');
          enviarRespuestaJson(res, 404, err);
        } else {
          console.log('Guardado con exito');
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

module.exports.borraTodos = function(req, res){
  Users
    .find().remove(function(err, success){
      if(err){
        console.log('Fallo la remocion');
        enviarRespuestaJson(res, 404, {'mensaje': ' no fue posible hacer la remocion'});
      } else {
        console.log('Remocion exitosa');
        enviarRespuestaJson(res, 200, {'mensaje': 'Remocion exitosa'});
      }
    })
}
