// let previousMessages = [
//     {
//     "Date":"November 3rd,2021",
//     "messages":[
//        "Enrique: Hello",
//         "Judy : Hi"
//      ]
//      }

//     // {
//     //     "Date":"November 2nd,2021",
//     //     "messages":[
//     //        "Enrique: Hey",
//     //         "Judy : Hola"
//     //      ]
//     //     }
//         // {
//         //     "Date":"November 1st,2021",
//         //     "messages":[
//         //        "Craig: :)",
//         //         "Midori : Yei"
//         //      ]
//         //     }
// ];


window.addEventListener('load', function () {


    //adding current date
    const date = new Date();
    //format the date
    const monthIndex = date.getMonth();
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    
    const day = date.getDate(); // returns day of the month 
    const year = date.getFullYear(); // returns the 4-digit year
    
    const dateString = months[monthIndex] + ' ' + day + ', ' + year;

    const dateElement = document.getElementById('date');
    dateElement.innerHTML = dateString;



    let chatBox = document.getElementById('chat-box-msgs');
    
    for(let i=0;i<previousMessages.length;i++){

        let pastDate = document.createElement('p');
        pastDate.innerHTML = previousMessages[i].Date;
        chatBox.appendChild(pastDate);
    

        for(let j=0;j<previousMessages[i].messages.length;j++){

          
            let pastChat = document.createElement('p');
            pastChat.innerHTML = previousMessages[i].messages[j];
            chatBox.appendChild(pastChat);
        }

    }
   

    chatBox.appendChild(dateElement);
    console.log(previousMessages);
/* --- Code to RECEIVE a socket message from the server --- */


    //Open and connect socket
    let socket = io();
    //Listen for confirmation of connection
    socket.on('connect', function () {
        console.log("Connected");
    });

    
    //Listen for messages named 'msg' from the server
    socket.on('msg', function (data) {
        console.log("Message arrived!");
        console.log(data);

        //Create a message string and page element
        let receivedMsg = data.name + ": " + data.msg;
        let msgEl = document.createElement('p');
        msgEl.innerHTML = receivedMsg;

        //Add the element with the message to the page
        chatBox.appendChild(msgEl);
        //Add a bit of auto scroll for the chat box
        chatBox.scrollTop = chatBox.scrollHeight;
    });

    /* --- Code to SEND a socket message to the Server --- */
    let nameInput = document.getElementById('name-input')
    let msgInput = document.getElementById('msg-input');
    let sendButton = document.getElementById('send-button');

    sendButton.addEventListener('click', function () {
        let curName = nameInput.value;
        let curMsg = msgInput.value;
        let msgObj = { "name": curName, "msg": curMsg };
 
        //Send the message object to the server
        socket.emit('msg', msgObj);
    });
});

let redirectButton = document.getElementById("redirects");

redirectButton.addEventListener("click",()=>{
    window.location = "/secondPage";
   
});

