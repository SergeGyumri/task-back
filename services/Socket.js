import {Server} from "socket.io";
import JWT from "jsonwebtoken";

const {JWT_SECRET} = process.env;

class Socket {
  static init = (server) => {
    this.io = new Server(server, {
      cors: '*'
    });
    this.io.on('connect', this.handleConnect);
  }

  static handleConnect = (client) => {
    try {
      const {authorization} = client.handshake.headers;
      const {userId, roomId} = JWT.verify(authorization.replace('Bearer ', ''), JWT_SECRET);
      client.join('user_' + userId);
      client.join('room_' + roomId);

      client.on("typing", (user) => {
        client.broadcast.to('room_' + user.roomId).emit("typing");
      });
    } catch (e) {
      console.log(e)
    }
  }

  static emit = (to, message, args = {}) => {
    return this.io.to(to).emit(message, args);
  }
}

export default Socket