const {DataTypes} = require('sequelize')
const db = require('../db/connection.js')

const Fabricante = db.define('fabricante',{
    codFabricante:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        autoIncrement:true
    },
    marca:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
},{
    tableName:'fabricantes',
    createdAt:false,
    updatedAt:false
})

module.exports = Fabricante