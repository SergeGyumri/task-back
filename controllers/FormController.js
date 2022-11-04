import validate from "../services/validate";
import {Interest, Age} from "../models";
import _ from 'lodash'

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
      const {userType = ''} = req.account;
      if (+userType === 1) {
        validate(req.body, {
          newAge: 'string|min:2|max:10',
          newInterest: 'string|min:2|max:15',
        });
        const age = await Age.findOne({
          where: {
            value: newAge
          },
        })
        const interest = await Interest.findOne({
          where: {
            value: newInterest
          },
        })
        const newValues = {
          age: {},
          interest: {}
        }
        if (_.isEmpty(age)) {
          const {id, value} = await Age.create({
            value: newAge,
          })
          newValues.age = {id, value};
        }
        if (_.isEmpty(interest)) {
          const {id, value} = await Interest.create({
            value: newInterest,
          })
          newValues.interest = {id, value};
        }
        res.json({
          status: 'ok',
          newValues
        })
      }
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
