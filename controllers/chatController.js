
const onSocket = (io) => {

    let socketsConected = new Set()
    io.on('connection', onConnected)


function onConnected(socket) {
    console.log('Socket connected', socket.id)
    socketsConected.add(socket.id)
    io.emit('clients-total', socketsConected.size)
  
    socket.on('disconnect', () => {
      console.log('Socket disconnected', socket.id)
      socketsConected.delete(socket.id)
      io.emit('clients-total', socketsConected.size)
    })
  
    socket.on('message', (data) => {
      // console.log(data)
      socket.broadcast.emit('chat-message', data)
    })
  
    socket.on('feedback', (data) => {
      socket.broadcast.emit('feedback', data)
    })
  }}
  
  module.exports = {
    onSocket
  };