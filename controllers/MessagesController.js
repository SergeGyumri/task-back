import {RoomMessages, Users} from "../models";
import HttpErrors from "http-errors";
import JWT from "jsonwebtoken";
import Socket from "../services/Socket";
import sequelize from "../services/sequelize";

const {JWT_SECRET} = process.env;

class MessagesController {
  static getMessages = async (req, res, next) => {
    try {
      const {authorization} = req.headers;
      const token = authorization.replace('Bearer ', '');
      const {roomId, userId} = JWT.verify(token, JWT_SECRET);

      const user = await Users.findOne({
        where: {
          id: userId,
        },
      })
      const messages = await RoomMessages.findAll({
        where: {
          roomId,
          createdAt: {
            $gte: user.createdAt
          },
        },
        // attributes: ['message', 'senderId', 'createdAt'],
        raw: true
      });

      res.json({
        messages,
        status: 'ok',
      })
    } catch (e) {
      next(e);
    }
  }
  static sendMessage = async (req, res, next) => {
    try {
      const {message = ''} = req.body;
      const {roomId = '', userId = '', userName = ''} = req;
      if (!message) {
        throw HttpErrors(404, 'no message')
      }
      const {dataValues} = await RoomMessages.create({
        message,
        senderId: userId,
        roomId,
        senderName: userName
      })
      Socket.emit('room_' + roomId, 'new-message', dataValues)
      res.json({
        status: 'ok',
      })
    } catch (e) {
      next(e);
    }
  }

  static deleteMessage = async (req, res, next) => {
    try {
      const {messageId = '', senderId = ''} = req.query;
      const {userId = ''} = req;
      if (+senderId === +userId) {
        await RoomMessages.destroy({
          where: {
            id: messageId
          }
        })
      }
      res.json({
        status: 'ok',
      });
    } catch (e) {
      next(e)
    }
  }
}

export default MessagesController;
