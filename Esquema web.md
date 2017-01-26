# Esquema web.

* páginas:
	* *index.html*:
		* pagina principal.
		* login de acceso.
		* acerca de la pagina?
	* *info.html*
		* informacion personal de logueado.
		* datos: **nombre completo, rut, telefono, direccción, correo electronico, asignaturas, actividades**.

# info.html

* datos de los alumnos guardados en API en una base de datos.
* el renderizado de los datos de los alumnos se hace a traves de la carga dinamica y llamadas a la API.
* posibilidades de edicion de los datos.

# Requerimientos.

* tabla con informacion de todos los cursos:
		* campos cursos.

			1. [x]nombre curso.
			2. [ ]horario.
			3. [ ]instructor.
			4. [ ]partner.
			5. [ ]observadores.
			6. [ ]link a google drive con informacion que se entrega al comienzo.  

* [ ]**no inmediato:** cada curso sea un link que renderice a una pagina que muestre la evaluacion del curso.
* usuario privilegiado debe tener un formulario donde llenar informacion de los cursos.
* una vez ingresado los datos de formulario maestro, la informacion debe renderizarse a cada usuario respectivo.
* los usuarios deben chequear informacion que les aparezca. El chequeo se hace en la pagina web. Al usuario maestro se le renderiza la informacion. Verde es chequead, Rojo es no chequeado.
