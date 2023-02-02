const socket = io();

$(document).ready(function () {
    displayUserDetails();
    startChat();
});

//the below function retrives the user's name and location from the database using ajax
const displayUserDetails = () => {
    const queryString = window.location.search;
    $.ajax({
        url: "/api/profile" + queryString,
        type: "GET",
        success: (result) => {
            console.log(result);
            document.getElementById("name-input").value = result.data.user;
        },
        error: (err) => {
            console.log(err);
        },
    });
};

//the below function is use to get the
function startChat() {
    const clientsTotal = document.getElementById("total users connected");
    const messageContainer = document.getElementById("message-container");
    const nameInput = document.getElementById("name-input");
    const messageForm = document.getElementById("message-form");
    const messageInput = document.getElementById("message-input");
    //
    const messageTone = new Audio("/message-tone.mp3");

    messageForm.addEventListener("submit", (e) => {
        e.preventDefault();
        sendMessage();
    });

    socket.on("clients-total", (data) => {
        clientsTotal.innerText = `User Available to chat`;
    });

    function sendMessage() {
        if (messageInput.value === "") return;
        // console.log(messageInput.value)
        const data = {
            name: nameInput.value,
            message: messageInput.value,
            dateTime: new Date(),
        };
        socket.emit("message", data);
        addMessageToUI(true, data);
        messageInput.value = "";
    }
    //notify the user with they recieve any messages from the other user with a tone sound

    socket.on("chat-message", (data) => {
        messageTone.play();
        addMessageToUI(false, data);
    });

    function addMessageToUI(isOwnMessage, data) {
        clearFeedback();
        const element = `
      <li class="${isOwnMessage ? "message-right" : "message-left"}">
          <p class="message">
            ${data.message}
            <span>${data.name} ● ${moment(data.dateTime).fromNow()}</span>
          </p>
        </li>
        `;

        messageContainer.innerHTML += element;
        scrollToBottom();
    }

    //this function is used to add a scroll features to the notifications when the dialogue is full
    function scrollToBottom() {
        messageContainer.scrollTo(0, messageContainer.scrollHeight);
    }
    //the below event listener lets the user to know the activity of the other user when he's typing the message
    messageInput.addEventListener("focus", (e) => {
        socket.emit("feedback", {
            feedback: `✍️ ${nameInput.value} is typing a message`,
        });
    });

    messageInput.addEventListener("keypress", (e) => {
        socket.emit("feedback", {
            feedback: `✍️ ${nameInput.value} is typing a message`,
        });
    });
    messageInput.addEventListener("blur", (e) => {
        socket.emit("feedback", {
            feedback: "",
        });
    });

    socket.on("feedback", (data) => {
        clearFeedback();
        const element = `
        <li class="message-feedback">
          <p class="feedback" id="feedback">${data.feedback}</p>
        </li>
  `;
        messageContainer.innerHTML += element;
    });
    //the below function will clear the event listeners if their activity is negative
    function clearFeedback() {
        document.querySelectorAll("li.message-feedback").forEach((element) => {
            element.parentNode.removeChild(element);
        });
    }
}
