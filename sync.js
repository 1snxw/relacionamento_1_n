const connection = require('./db/connection.js')
const {Fabricante, Produto} = require('./model/associacao.js')

async function syncDatabase(){
    try{    
        await connection.sync({force:true})
        console.log('Tabelas  criadad e banco sincronizado!')
    }catch(err){
        console.error('erro ao conectar com o banco de dados!', err)
    }finally{
        connection.close()
        console.log('fechando a conexão com o banco de dados')
    }
}

syncDatabase()