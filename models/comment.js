// Definicion del modelo de Quiz con validación

var models = require('../models/models.js');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
  	'Comment',
    { texto: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Comentario"}}
      },
      publicado: {
      	type: DataTypes.BOOLEAN,
      	defaultValue: false
      }
    }    
 ,
  {
    classMethods: {
      countUnpublished: function () {
        //Comentario no publicados
		return this.count({where: {publicado: 'false'}}).then('success', function(count) {
			return count;
    })
      },
      countCommentedQuizes: function () {
        return models.sequelize.query('SELECT count(*) AS n FROM "Quizzes" WHERE "id" IN (SELECT DISTINCT "QuizId" FROM "Comments")').then('success',function(result){
               return result[0].n;
    })
      }
    }
  });
};