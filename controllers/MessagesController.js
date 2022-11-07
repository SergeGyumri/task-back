import {RoomMessages, Users} from "../models";
import HttpErrors from "http-errors";
import Socket from "../services/Socket";


class MessagesController {
  static getMessages = async (req, res, next) => {
    try {
      const {userId, roomId, userType} = req.account;
      const user = await Users.findOne({
        where: {
          id: userId,
        },
        attributes: ['createdAt'],
        raw: true
      })
      const where = {
        roomId,
      }
      if (userType !== 1) {
        where.createdAt = {$gte: user.createdAt};
        where.deleted = false;
      }
      const messages = await RoomMessages.findAll({
        where,
        attributes: ['id', 'message', 'senderId', 'createdAt', 'senderName'],
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
      const {roomId = '', userId = '', userName = ''} = req.account;
      if (!message) {
        throw HttpErrors(404, 'no message')
      }
      const {dataValues} = await RoomMessages.create({
        message,
        senderId: userId,
        roomId,
        senderName: userName
      })
      Socket.emit('room_' + roomId, 'new-message', dataValues);
      res.json({
        status: 'ok',
        dataValues
      })
    } catch (e) {
      next(e);
    }
  }

  static deleteMessage = async (req, res, next) => {
    try {
      const {messageId = ''} = req.params;
      const {userId, roomId, userType} = req.account;
      const {senderId} = await RoomMessages.findOne({
        where: {
          id: messageId
        },
        attributes: ['senderId'],
        raw: true
      })
      if (senderId === userId || userType === 1) {
        await RoomMessages.update({deleted: true}, {
          where: {
            id: messageId
          }
        })
      }
      Socket.emit('room_' + roomId, 'delete-message', messageId);
      res.json({
        status: 'ok',
      });
    } catch (e) {
      next(e)
    }
  }
}

export default MessagesController;
