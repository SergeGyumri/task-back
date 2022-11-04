import validate from "../services/validate";
import {Users} from "../models";
import HttpErrors from "http-errors";
import _ from 'lodash'
import JWT from "jsonwebtoken";

const {JWT_SECRET} = process.env;

class AdminController {
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
