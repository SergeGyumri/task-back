import {Users} from "../models";
import socket from "../services/Socket";

class AdminController {
  static blockUser = async (req, res, next) => {
    try {
      const {userId} = req.body;
      const {userType} = req.account;
      if (userType === 1) {
        await Users.update({blocked: true}, {
          where: {
            id: userId,
          }
        })
        const message = 'your account is blocked';
        socket.emit('user_' + userId, 'user-block', {userId, message})
      }
      res.json({
        status: 'ok',
      });
    } catch (e) {
      next(e);
    }
  }

}

export default AdminController;
