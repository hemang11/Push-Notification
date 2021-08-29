const express = require('express');
const http = require('http');
const app = express();
// const cors = require('cors');
const server = http.createServer(app);

// In the socket V3 you need to explicitly enable Cross-Origin Resource Sharing (CORS).
const io = require('socket.io')(server,{ // Making a socket of server through which all clients will be connected
    cors:{
        origin:"*", // allow request from any origin
        credentials:true, // allow cookies
    }
});

// app.use(cors({
//         origin:"*",
//         credentials:true,
//     })
// ); // allow request from any origin


app.get('/',(req,res)=>{
    res.send(`Notify`);
})

// Server listening on for connections from client
io.on('connection',socket=>{ // server listening for connection
    socket.on('push_client',client=>{
        console.log(`Connection established with the client : ${socket.id}`);
        const {email,password} = client;
        // emitting to all the clients connected to the server
        // this can be changed based on the use case
        io.emit('notify',client);
    })
})

// listening on the port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT,()=>{
    console.log(`Server is Running on PORT : ${PORT}`)
})