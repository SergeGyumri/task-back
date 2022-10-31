import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize";
import Age from "./Age";
import Interest from "./Interest";

class Rooms extends Model {

}

Rooms.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  }
}, {
  sequelize,
  tableName: 'room',
  modelName: 'room',
});

Rooms.belongsTo(Age, {
  foreignKey: 'ageId',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});
Rooms.belongsTo(Interest, {
  foreignKey: 'interestId',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

export default Rooms;