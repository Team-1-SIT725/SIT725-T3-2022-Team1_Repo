// const io = require('socket.io');
// const app = require('../src/app');

// describe('socket', () => {
//   let appServer;

//   before(done => {
//     appServer = app.listen(3000);
//     appServer.on('listening', done);
//   });

//   after(done => {
//     appServer.close(done);
//   });

//   it('should pass', done => {
//     const client = io('http://localhost:3000');

//     client.on('connect', () => {
//       client.close();
//       done();
//     });
//   });
// });