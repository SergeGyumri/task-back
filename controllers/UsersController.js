import {Users, Rooms} from "../models";
import HttpErrors from "http-errors";
import JWT from "jsonwebtoken";
import jwt from "jsonwebtoken";

const {JWT_SECRET} = process.env;

class UsersController {

  static goToChat = async (req, res, next) => {
    try {
      const {ageId = '', interestId = ''} = req.body;
      if (!ageId || !interestId) {
        throw HttpErrors(422, {
          errors: {
            error: [`choose ${!ageId && !interestId ? 'age and interest' : !ageId ? 'age' : 'interest'}`]
          }
        });
      }
      const room = await Rooms.findOrCreate({
        where: {ageId, interestId},
        attributes: ['id'],
        raw: true,
      })
      setTimeout(async () => {
        const user = await Users.create({
          roomId: room[0].id,
        });
        const token = JWT.sign({userId: user.id, roomId: user.roomId}, JWT_SECRET);
        res.json({
          status: 'ok',
          token,
        })


      }, 5000)
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
        attributes: ['id', 'roomId'],
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
