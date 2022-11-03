import validate from "../services/validate";
import {Users} from "../models";
import HttpErrors from "http-errors";
import _ from 'lodash'
import JWT from "jsonwebtoken";

const {JWT_SECRET} = process.env;

class AdminController {
  static loginAdmin = async (req, res, next) => {
    try {
      const {login = '', password = ''} = req.body;
      validate(req.body, {
        login: 'string|required',
        password: 'string|required',
      });
      const user = await Users.findOne({
        where: {
          type: 1,
          name: login,
          password: Users.hash(password)
        },
        attributes: ['id', 'type', 'name'],
        raw: true
      })
      if (_.isEmpty(user)) {
        throw HttpErrors(422, 'wrong login or password');
      }
      const token = JWT.sign({userId: user.id, userName: user.name, type: user.type}, JWT_SECRET);
      res.json({
        status: "ok",
        token
      })
    } catch (e) {
      next(e);
    }
  }
  static blockUser = async (req, res, next) => {
    try {

    } catch (e) {
      next(e);
    }
  }

  static deleteMessage = async (req, res, next) => {
    try {

    } catch (e) {
      next(e)
    }
  }
}

export default AdminController;
