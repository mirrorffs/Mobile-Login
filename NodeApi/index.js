const express = require('express')
require('./models/User')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const requireToken = require('./middleware/requireToken')
const app = express()
const port = 3000
const {mongoUrl} = require('./keys')

const authRoutes = require('./routes/authRoutes')

app.use(bodyParser.json())
app.use(authRoutes)


mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true

})

mongoose.connection.on('connected',()=>{
    console.log("connected to MongoDB")
})

mongoose.connection.on('error',(err)=>{
    console.log("error occured ",err)
})


app.get('/',requireToken,(req,res)=>{
    res.send({email:req.user.email})
})

app.post('/',(req,res)=>{
    console.log(req.body)
    res.send('hello')
})

app.listen(port,()=>{
    console.log("server is running on port "+port)
})