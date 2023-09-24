var socket= io();
let username='';
const btn=document.getElementById('join-chat');
const usernameInput=document.getElementById('username-input');
//this usernamInput extracting value from tag i html
//and above user name is variable that store value of username Input
const usernameForm=document.querySelector('.form-username');
const  chatroomContainer=document.querySelector('.chatroom-container');
const messageInput=document.getElementById('message-input');
const sendBtn=document.getElementById('send-button');
const messageContainer=document.querySelector('.messages');



btn.addEventListener('click',(event)=>{
    event.preventDefault();
    username=usernameInput.value;
    // console.log(username);

    //this will make sure username is not empty
    if(username){
        usernameForm.style.display='none';
        chatroomContainer.style.display='block';
    }
})


sendBtn.addEventListener("click",(event)=>{
    event.preventDefault();
    let data={
        id:socket.id,//id i got from socket
        username:username,
        message:messageInput.value,
    }
    //when user click so data is emmitting msg
    socket.emit('secret message',data);  // 'chat message' it is defined by me yha chat message ki jagah kuch bhi likh sakte hain
    //here "chat message" is a data object 
     appendMessage(data, 'sent');
})


socket.on('secret message' ,(data)=>{//this on listening io.emit jo server file se emit hora hai
    if(data.id!==socket.id){
        appendMessage(data,'recieved');
    }
})



function appendMessage(data,type){
    var msgDiv=document.createElement('div');
    msgDiv.innerText=`${data.username} : ${data.message}`
    if(type==='sent'){
        msgDiv.setAttribute('class','message sent')
    }
    else{
        msgDiv.setAttribute('class','message')
    }
    messageContainer.append(msgDiv);
    messageInput.value='';
}