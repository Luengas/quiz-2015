// Definicion del modelo de Quiz con validación

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
        return this.count({distinct: 'QuizId',where: {publicado: 'true'}}).then('success', function(count) {
			return count;
    })
      }
    }
  });
};