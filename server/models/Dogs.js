const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('Dogs', {

        id: {

            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            // el defaultValue en este caso es para darle un valor por defecto al id, ya que queremos mantener la estructura que estamos obteniendo de la api externa comenzara en el ultimo numero del resultado de la api. 
            defaultValue: sequelize.literal('nextval(\'inicio\'::regclass)'),


        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        height: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        weight: {

            type: DataTypes.JSON,
            allowNull: false,

        },

        life_span: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    }, { timestamps: false });



};