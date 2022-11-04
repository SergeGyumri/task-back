import jwt from "jsonwebtoken";
import HttpErrors from "http-errors";

function checkAdmin(req, res, next) {
  try {
    const {JWT_SECRET} = process.env;
    const {authorization} = req.headers;
    const token = authorization.replace('Bearer ', '');
    const user = jwt.verify(token, JWT_SECRET);
    if (user.type === 1) {
      next();
      return;
    }
    throw HttpErrors(401, 'unauthorized');
  } catch (e) {
    next(e);
  }
}

export default checkAdmin;
