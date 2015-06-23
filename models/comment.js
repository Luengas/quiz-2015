// Definicion del modelo de Quiz con validaci�n

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
	  //Preguntas con comentario
      countCommentedQuizes: function () {
        return this.count( { group : '"QuizId"'}).then(function (count) {
			return count;
    })
      }
    }
  });
};