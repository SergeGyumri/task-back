import validate from "../services/validate";
import {Interest, Age} from "../models";

class FormController {
  static getFormData = async (req, res, next) => {
    try {
      const ages = await Age.findAll({
        attributes: ['id', 'value'],
      });
      const interests = await Interest.findAll({
        attributes: ['id', 'value'],
      });
      res.json({
        status: 'ok',
        ages,
        interests
      })
    } catch (e) {
      next(e);
    }
  }
  static addField = async (req, res, next) => {
    try {
      const {newAge = '', newInterest = ''} = req.body;
      validate(req.body, {
        newAge: 'string|min:2|max:10',
        newInterest: 'string|min:2|max:15',
      });
      if (newAge) {
        await Age.findOrCreate({
          where: {value: newAge}
        })
      }
      if (newInterest) {
        await Interest.findOrCreate({
          where: {value: newInterest}
        });
      }
      res.json({
        status: 'ok',
        newAge,
        newInterest
      })
    } catch (e) {
      next(e);
    }
  }

  static deleteField = async (req, res, next) => {
    try {
      const {ageId = '', interestId = ''} = req.query;
      validate(req.query, {
        ageId: 'numeric',
        interestId: 'numeric',
      });
      await Interest.destroy({
        where: {id: interestId}
      });
      await Age.destroy({
        where: {id: ageId}
      });
      res.json({
        status: 'ok',
      });
    } catch (e) {
      next(e)
    }
  }
}

export default FormController;
