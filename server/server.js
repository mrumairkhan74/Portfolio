const app = require('./app')

const { createServer } = require('http');
const { Server } = require('socket.io')

const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true
    }
});

io.on("connected", (socket) => {
    console.log('New user connected')

    socket.on('message', (data) => {
        io.emit("New Message", data)
    })
    socket.on('disconnected', () => {
        console.log("user Disconnected")
    })
})
const port = process.env.PORT

httpServer.listen(port, () => {
    console.log('=================================')
    console.log('| Server Running on PORT 50000  |')
    console.log('=================================')
})