import {Users, Rooms} from "../models";
import HttpErrors from "http-errors";
import JWT from "jsonwebtoken";
import jwt from "jsonwebtoken";
import validate from "../services/validate";

const {JWT_SECRET} = process.env;

class UsersController {
  static logInAdmin = async (req, res, next) => {

    const {login = '', password = ''} = req.body;

  }
  static goToChat = async (req, res, next) => {
    try {
      const {ageId = '', interestId = '', userName = ''} = req.body;
      validate(req.body, {
        ageId: 'numeric|required',
        interestId: 'numeric|required',
        userName: 'string|min:3|max:15|required',
      });

      const room = await Rooms.findOrCreate({
        where: {ageId, interestId},
        attributes: ['id'],
        raw: true,
      })
      const user = await Users.create({
        roomId: room[0].id,
        name: userName,
      });
      const token = JWT.sign({userId: user.id, roomId: user.roomId, userName: user.name}, JWT_SECRET);
      res.json({
        status: 'ok',
        token,
      })

    } catch (e) {
      next(e);
    }
  }
  static logOutChat = async (req, res, next) => {
    try {
      const {userId} = req;
      await Users.destroy({
        where: {id: userId},
      });
      res.json({
        status: 'ok',
      })

    } catch (e) {
      next(e);
    }
  }

  static myAccount = async (req, res, next) => {
    try {
      const {userId} = req;
      const user = await Users.findOne({
        where: {id: userId},
        attributes: ['id', 'roomId', 'name', 'type'],
        raw: true
      });
      res.json({
        status: 'ok',
        user
      })
    } catch (e) {
      next(e);
    }
  }
}

export default UsersController;
