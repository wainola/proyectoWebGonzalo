var request = require('request');
var apiOptions = {
  server: 'http://localhost:3000'
};

var renderizadoPagina = function(req, res, responseBody){
  // renderizamos la vista usando el metodo res.render() de express.
  res.render('paginaPrincipal', {
    title: 'Web Classroom',
    pageHeader: {
      title: 'Web Classroom',
      strapline: 'Registro on-line de clases y actividades.'
    },
    usuarios: responseBody
  });
  console.log(responseBody);
};

module.exports.paginaPrincipal = function(req, res){
  var opcionesRequest, ruta;
  ruta = '/api/usuarios';
  opcionesRequest = {
    url: apiOptions.server + ruta,
    method: 'GET',
    json: {}
  };
  request(
    opcionesRequest,
    function(err, response, body){
      renderizadoPagina(req, res, body);
    }
  )
};
