const express = require('express');
const cors = require('cors');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')
const bodyParser = require('body-parser')

const db = lowdb(new FileSync('db.json'))

db.defaults({livros: []}).write()

const app = express()

app.use(cors())

app.use(bodyParser.json())
const PORT = 4000;
app.get('/livros', (req,res)=>{
   const data = db.get('livros').value()
   return res.json(data)
})

app.put('/emprestimo/:id',(req,res)=>{
   const {id} = req.params;
   console.log(id)
   const data = db.get('livros')
                  .find( { id : parseInt(id) } )
                  .assign({emprestimo:true})
                  .write();
   res.json({msg:"Sucesso"})
})

app.put('/devolver/:id',(req,res)=>{
   const {id} = req.params;
   console.log(id)
   const data = db.get('livros')
                  .find( { id : parseInt(id) } )
                  .assign({emprestimo:false})
                  .write();
   res.json(data)
})


app.listen(PORT,()=>{
   console.log(`Tomate cru na porta: ${PORT}`)
})