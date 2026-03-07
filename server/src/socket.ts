import {Server} from "socket.io";
import {Socket} from "socket.io";

interface CustomSocket extends Socket{
room?:string;
}
export function setupSocket(io:Server){
    io.use((socket:CustomSocket,next)=>{
        const room = socket.handshake.auth.room;
        
        if(!room){
            return next(new Error("Invalid room"));
        }
        socket.room = room;

        next(); 
    })
    io.on("connection",(socket:CustomSocket)=>{
        
        console.log("A user connected with id: ",socket.id);


        socket.on("message",(data)=>{
            console.log("The socket message is:",data);
            io.to(socket.room!).emit("message",data);
        });
        socket.on("disconnect",()=>{
            console.log("A user disconnected with id: ",socket.id);
        })                          
    })
}