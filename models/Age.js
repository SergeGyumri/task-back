import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize";

class Age extends Model {

}

Age.init({
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
  tableName: 'age',
  modelName: 'age',
});
export default Age;