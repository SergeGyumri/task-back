import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize";
import Rooms from "./Rooms";

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
  roomId: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'roomMessages',
  modelName: 'roomMessages',
});


export default RoomMessages;