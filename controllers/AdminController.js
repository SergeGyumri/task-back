import validate from "../services/validate";

class AdminController {
  static loginAdmin = async (req, res, next) => {
    try {
      const {login = '', password = ''} = req.body;
      validate(req.body, {
        login: 'string|min:3|required',
        password: 'string|min:3|required',
      });


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