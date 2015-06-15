var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else { next(new Error('No existe quizId=' + quizId)); }
    }
  ).catch(function(error) { next(error);});
};

// GET /quizes
exports.index = function(req, res) {
	var _patronBusqueda = req.query.search || "";
	 _patronBusqueda = "%" + _patronBusqueda.replace(/\s/gi, "%") + "%";
	 // Objeto que modela una pseudo clausula WHERE de SQL
	var _paramBusqueda = {
    // El comodin "?" de la expresión de la primera posición
    // del array se sustituye por el contenido de la segunda posición
    where: ["pregunta like ?", _patronBusqueda]};
  
  models.Quiz.findAll(_paramBusqueda).then(
    function(quizes) {
      res.render('quizes/index', { quizes: quizes});
    }
  ).catch(function(error) { next(error);})
};

// GET /quizes/:id
exports.show = function(req, res) {
  res.render('quizes/show', { quiz: req.quiz});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  var resultado = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta) {
    resultado = 'Correcto';
  }
  res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};

// GET /author
exports.author = function(req, res) {
   res.render('author', {autor: 'Iñaki Luengas'});
};

