import { Server } from "socket.io";

const socketInit = (httpServer) => {
  let messages = [];

  const io = new Server(httpServer);
  io.on("connection", (user) => {
    user.emit("chat", messages);
    console.log(
      `Cliente conectado desde ${user.handshake.address}. ID de usuario: ${user.id}`
    );

    io.on("newMessage", (data) => {
      messages.push(data);
      console.log(`Mensaje de ${user.id}: ${data.message}`);

      io.emit("messageArrived", data);
    });
  });

  return io;
};

export default socketInit;
