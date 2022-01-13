const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Recipe = sequelize.define('Recipe', {
    id:{
      primaryKey: true,
      type: DataTypes.UUID, // esto permite crear un valor unico de ID
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING
    },
    resumePlate: {     // esto es Resumen - del plato
      type: DataTypes.STRING,
      allowNull: false,
    },
    puntuation: { // esto es puntuacion - del plato
      type: DataTypes.STRING,
      allowNull: true,
    },
    healthyLevel: { // esto es Nivel de comida saludable
      type: DataTypes.STRING,
      allowNull: true,
    },
    stepToStep:{
      type: DataTypes.STRING,
      allowNull: false
    },
    // type: {
    //   type: DataTypes.ENUM('Sin gluten', 'Ketogénica', 'Vegetariano', 'Lacto-vegetariano', 'Ovo-Vegetariano', 'Vegano', 'Pescetariano', 'Paleo'),
    //   allowNull: false
    // },
    createInDb:{ // esto nos permite saber si el valor llamado proviene de la base de datos o la Api
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }
  });
  return Recipe;
};

// [ ] Receta con las siguientes propiedades:
// ID: *
// Nombre *
// Resumen del plato *
// Puntuación
// Nivel de "comida saludable"
// Paso a paso