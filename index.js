const express = require('express')
const app = express()
const cors = require('cors')
const connection = require('./db/connection.js')
const Fabricante = require('./model/Fabricante.js')
const Produto = require('./model/Produto.js')
const PORT = 3000
const hostname = 'localhost'

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())


app.delete('/fabricante/:id', async (req,res)=>{
    const dados = req.params
    console.log(dados)
    const pesq = await Fabricante.findByPk(dados.id)
    try{
        if(pesq === null){
            console.log(pesq)
            res.status(404).json({message:"Fabricante inexistente no sistema"})
        }else{
            console.log(pesq)
            await Fabricante.destroy({where:{codFabricante: dados.id}})
            res.status(200).json({message:"Fabricante excluido!"})
        }
    }catch(err){
        console.error("não foi possivel apagar os dados",err)
        res.status(500).json({message:"não foi possivel apagar os dados"})
    }
    
    
})

app.post('/produto', async(req,res)=>{
    const dados = req.body
    console.log(dados)
    try{
        if(dados.fabricanteid == 1){
            const pesq = await Produto.create(dados, {raw:true})
            res.status(200).json({message:"fabricante correto"})
        }else{
            res.status(404).json({message:"fabricante não existe"})
        }
    }catch(err){
        console.error("erro ao cadastrar produto",err)
        res.status(500).json({message:"erro ao cadastrar produto"})
    }
})

app.get('/fabricante',async (req,res)=>{
    const dados = req.query
    console.log(dados)
    try{
        const pesq = await Fabricante.findOne({where:{marca:dados.marca}, raw:true})
        if(pesq === null){
            console.log("dados inexistentes")
            res.status(404).json({message:"dados não encontrados"})
        }else if(pesq.marca == dados.marca ){
            console.log(pesq.marca)
            res.status(200).json(pesq)
        }
        // console.log(pesq)
        // res.status(200).json(pesq)
    }catch(err){
        res.status(500).json({message:"erro ao cadastrar produto"})
    }
})

app.get('/fabricantes', async (req,res)=>{
    try{
    const pesq = await Fabricante.findAll()
    res.status(200).json(pesq)
    console.log(pesq)
    }catch(err){
        console.error('n]ao foi possivel listar os dados',err)
        res.status(500).json({message:"não foi possível listar os dados"})
    }
})

app.post('/fabricante',async (req,res)=>{
    const dados = req.body
    console.log(dados)
    try{
        const pesq = await Fabricante.create(dados, {raw:true})
        console.log(pesq)
        res.status(200).json(pesq)

    }catch(err){
        res.status(500).json({message:"erro ao cadastrar produto"})
    }
})

app.put('/fabricante', async(req,res)=>{
    const dados = req.body
    console.log(dados)
    const pesq = await Fabricante.findByPk(dados.codFabricante)
    console.log(pesq)
    res.status(200).json(pesq)
} )

app.get('/', (req,res)=>{
    res.status(200).json({message:"Aplicação rodando"})
})

connection.sync().then(()=>{
    app.listen(PORT,hostname,()=>{
        console.log(`servidor rodando em ${PORT}:${hostname}`)
    })
}).catch((err)=>{
    console.error('erro de conexão com o banco de dados', err)
})