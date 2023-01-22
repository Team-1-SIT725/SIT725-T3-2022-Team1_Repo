const socket = io();

const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");


// $(document).ready(function () {
    $.ajax({
        url: "/api/profile",
        type: "GET",
        
        success: (result) => {
            const userName = result.user;
            socket.emit("user:join", userName);
        }
    });
// });





socket.on("global:message", (message) => {
	messages.innerHTML += `
    <p class="join_message" >${message}</p>
    `;
});

socket.on("message:receive", (payload) => {
	messages.innerHTML += `          
    <div class="receive_message_container" >
        <p class="receiver_name" >${payload.name}</p>
        <p class="sent_message" >${payload.message}</p>
    </div>
    `;
});

form.addEventListener("submit", (e) => {
	e.preventDefault();
	messages.innerHTML += `          
    <div class="sent_message_container" >
        <p class="your_name" >You</p>
        <p class="sent_message" >${input.value}</p>
    </div>
    `;
	socket.emit("message:send", { name: userName, message: input.value });
	input.value = "";
});
