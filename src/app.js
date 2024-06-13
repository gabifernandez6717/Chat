const express = require('express')
const expressHDBRS = require('express-handlebars')
const {Server} = require('socket.io')

const app = express()
const PORT = 8080

app.use (express.static("./src/public"))
app.use (express.json())
app.use (express.urlencoded({extended: true}))

app.engine('handlebars', expressHDBRS.engine())
app.set('view engine', 'handlebars')
app.set('views', './src/views')

app.get('/', (req, res) =>{
    res.render("index")
})

const httpServer = app.listen(PORT, () =>{
    console.log(" listening on port 8080");
})

const io = new Server(httpServer)

let mensajes=[]

io.on("connection", (socket)=>{
    console.log("un cliente se conecto");
    socket.on("mensaje", (data)=>{
        mensajes.push(data)
        socket.emit("mensajesLogs", mensajes)
    })
})