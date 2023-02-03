const users = [];

const onSocket = (io) => {
	io.on("connection", (socket) => {
		socket.on("user:join", (name) => {
			!users.some((user) => user.name === name) &&
				users.push({ name, sockeId: socket.id });
			io.emit("global:message", `chat with ${name} `);
		});

		socket.on("message:send", (payload) => {
			socket.broadcast.emit("message:receive", payload);
		});

		
	});
};

// export default onSocket;
module.exports = {onSocket};
