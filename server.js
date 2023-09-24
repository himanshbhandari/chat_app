const express=require('express');

const app=express();
const http=require('http');

//this is combinatin of express() + http;
//pure express app to use to send the html folder
//create server which is combination of http and express()
const server=http.createServer(app);

//i got server by destructring socket.io
const { Server }=require("socket.io");

//this after destructing this Server give my a class 
//this is how you are actually creataed io
const io =new Server(server);//io is instances of Server which is eventuallyy  comming from  socket io
const PORT=process.env.PORT || 3000;
io.on("connection" ,(socket)=>{  //  her 'connection' is predefined  ,on i short of eventlistener 
    // console.log('hello');
    // console.log(socket.id);
    socket.on('secret message',(data)=>{
        io.emit('secret message',data)
    })

})


//app.use is used to run middleware
app.use(express.static('public'));//express.static("foler name") is static method used to accesss my html css and javascript file
 //pure express to server my frontend from  pure app

//http + express should listen
server.listen(PORT); //combined server is listening at my PORT