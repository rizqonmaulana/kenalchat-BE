const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const routesNavigation = require('./src/routesNavigation')
const cors = require('cors')
const socket = require('socket.io')

require('dotenv').config()

const port = process.env.PORT

const app = express()
app.use(morgan('dev'))
app.use('/apikenal/fileupload', express.static('uploads'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-With, Content-Type, Accept, Authorization'
  )
  next()
})

const http = require('http')
const server = http.createServer(app)
const io = socket(server, {
  cors: {
    origin: '*'
  },
  path: '/apikenal/socket.io'
})
io.on('connection', (socket) => {
  console.log('Socket.io Connect !')
  // global Message = pesan yang di kirimkan ke semua client
  // private Message = pesan yang hanya dikirimkan ke client saja
  // broadcast Message = pesan yang di kirimkan ke semua client kecuali si pengirim
  // room = ruangan pesan yang bisa di akses/ dimasuki client
  socket.on('globalMessage', (data) => {
    console.log(data)
    io.emit('chatMessage', data)
  })
  socket.on('privateMessage', (data) => {
    socket.emit('chatMessage', data)
  })
  socket.on('broadcastMessage', (data) => {
    socket.broadcast.emit('chatMessage', data)
  })
  socket.on('joinRoom', (data) => {
    console.log(data)
    socket.join(data.room)
  })
  // =
  socket.on('changeRoom', (data) => {
    console.log(data)
    socket.leave(data.oldRoom)
    socket.join(data.room)
  })
  // =
  socket.on('roomMessage', (data) => {
    console.log('ini data room ms')
    console.log(data)
    io.to(data.room_id).emit('chatMessage', data)
  })
  socket.on('typing', (data) => {
    console.log(data)
    socket.broadcast.to(data.room).emit('typingMessage', data)
  })
  socket.on('leaveRoom', (data) => {
    socket.leave(data.room)
  })
})

app.use('/apikenal', routesNavigation)

app.get('*', (req, res) => {
  res.status(404).send('Not found please check again !')
})

server.listen(port, () => {
  console.log(`Kenal app listening at http://localhost:${port}`)
})
