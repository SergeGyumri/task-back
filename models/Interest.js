import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize";

class Interest extends Model {

}

Interest.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  tableName: 'interest',
  modelName: 'interest',
})
export default Interest;
