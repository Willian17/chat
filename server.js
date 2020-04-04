const express = require('express')
const path = require('path')

const app = express()

const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname , 'public')))
app.set('views' ,path.join(__dirname , 'public'))
app.engine('html'  ,require('ejs').renderFile)
app.set('view engine', 'html') 

// agora podemos usar html para nossas views do chat

app.use('/' , (req , res) =>{
    res.render('index.html')

})

let messages = [] // como se fosse um banco de dados

io.on('connection' , socket =>{
    console.log(`Socket conectado, id: ${socket.id}`)

    socket.on('sendMessage' , data =>{
        messages.push(data)

        socket.broadcast.emit('recivedMessage' , data) // avisar para todo mundo
    })
})

server.listen(8080 , ()=>{
    console.log('servidor ligado na porta 3000')
})
