import {Users, Rooms} from "../models";
import HttpErrors from "http-errors";
import JWT from "jsonwebtoken";
import jwt from "jsonwebtoken";
import validate from "../services/validate";
import _ from "lodash";

const {JWT_SECRET} = process.env;

class UsersController {
  static register = async (req, res, next) => {
    try {
      const {login = '', password = ''} = req.body;
      validate(req.body, {
        login: 'string|required|min:3|max:15',
        password: 'string|required|min:3|max:15',
      });
      const findUser = await Users.findOne({
        where: {
          login,
        },
      })
      if (!_.isEmpty(findUser)) {
        throw HttpErrors(422, 'this login is already taken, choose another login');
      }
      await Users.create({
        login,
        password
      })
      res.json({
        status: "ok",
      })
    } catch (e) {
      next(e);
    }
  }
  static login = async (req, res, next) => {
    try {
      const {login = '', password = ''} = req.body;
      validate(req.body, {
        login: 'string|required|min:3|max:15',
        password: 'string|required|min:3|max:15',
      });
      const user = await Users.findOne({
        where: {
          login,
          password: Users.hash(password)
        },
      })
      if (_.isEmpty(user)) {
        throw HttpErrors(422, 'wrong login or password');
      }
      const token = JWT.sign({userId: user.id, type: user.type}, JWT_SECRET);
      res.json({
        status: "ok",
        token
      })
    } catch (e) {
      next(e);
    }
  }

  static goToChat = async (req, res, next) => {
    try {
      const {ageId = '', interestId = '', userName = ''} = req.body;
      const {userId = ''} = req.account;
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
      await Users.update({
        roomId: room[0].id,
        name: userName,
      }, {
        where: {
          id: userId
        },
      });
      const user = await Users.findOne({
        where: {
          id: userId
        },
        attributes: ['id', 'roomId', 'name', 'type'],
        raw: true
      })
      const token = JWT.sign({userId: user.id, roomId: user.roomId, userName: user.name, type: user.type}, JWT_SECRET);
      res.json({
        status: 'ok',
        token,
        account : user
      })
    } catch (e) {
      next(e);
    }
  }
  static logOutChat = async (req, res, next) => {
    try {
      const {userId} = req.account;
      await Users.update({name: null, roomId: null}, {
        where: {id: userId},
      });
      const user = await Users.findOne({
        where: {
          id: userId
        }
      })
      const token = JWT.sign({userId: user.id, type: user.type}, JWT_SECRET);
      res.json({
        status: 'ok',
        token
      })
    } catch (e) {
      next(e);
    }
  }

  static myAccount = async (req, res, next) => {
    try {
      const {userId} = req.account;
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
