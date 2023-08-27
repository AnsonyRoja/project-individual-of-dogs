const { Sequelize } = require('sequelize');
require('dotenv').config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const DogsModel = require('../models/Dogs');
const TemperamentsModel = require('../models/Temperaments');

// creamos la conexion a la base de datos
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, { logging: false, timestamps: false });


// inicializamos los modelos
DogsModel(sequelize);
TemperamentsModel(sequelize);

// creamos las relaciones entre los modelos
const { Dogs, Temperaments } = sequelize.models;

// belongsToMany crea una tabla intermedia entre las dos tablas que relaciona de muchos a muchos
Dogs.belongsToMany(Temperaments, { through: 'dogs_temperaments' }, { "timestamps": false });
Temperaments.belongsToMany(Dogs, { through: 'dogs_temperaments' }, { "timestamps": false });

module.exports = {

    conn: sequelize,
    ...sequelize.models,
}