import HttpErrors from "http-errors";
import jwt from "jsonwebtoken";


const exclude = [
  'GET:/form/get-form',
  'POST:/users/go-to-chat',
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
    const roomId = user.roomId;
    if (!userId) {
      throw HttpErrors(401);
    }
    req.userId = userId;
    req.roomId = roomId;
    next();
  } catch (e) {
    next(e);
  }
}

export default authorization;
