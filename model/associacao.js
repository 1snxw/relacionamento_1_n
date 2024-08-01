const Produto = require('./Produto.js')
const Fabricante = require('./Fabricante')


Fabricante.hasMany(Produto,{
    foreignKey:'fabricanteid',
    as:'produtos',
    onDelete:'CASCADE'
})

Produto.belongsTo(Fabricante,{
    foreignKey:'fabricanteid',
    as:'fabricante',
    allowNull:false
})

module.exports = {Fabricante, Produto}