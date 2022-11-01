import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize";
import Rooms from "./Rooms";
import Age from "./Age";

class RoomMessages extends Model {

}

RoomMessages.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false
  },
  senderId: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  senderName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'roomMessages',
  modelName: 'roomMessages',
});
RoomMessages.belongsTo(Rooms, {
  foreignKey: 'roomId',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

export default RoomMessages;