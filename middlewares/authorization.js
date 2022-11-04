import HttpErrors from "http-errors";
import jwt from "jsonwebtoken";

const exclude = [
  'POST:/users/register',
  'POST:/users/login',
]

function authorization(req, res, next) {
  try {
    const {originalUrl, method} = req;
    if (method === 'OPTIONS' || exclude.includes(method + ':' + originalUrl.replace(/\?.*/, ''))) {
      next();
      return;
    }
    const {authorization} = req.headers;
    const {JWT_SECRET} = process.env;
    const token = authorization.replace('Bearer ', '');
    const user = jwt.verify(token, JWT_SECRET);
    const userId = user.userId;
    const userName = user.userName;
    const roomId = user.roomId;
    const userType = user.type;
    if (!userId) {
      throw HttpErrors(401);
    }
    req.account = {
      userId,
      roomId,
      userName,
      userType
    }
    next();
  } catch (e) {
    next(e);
  }
}

export default authorization;
