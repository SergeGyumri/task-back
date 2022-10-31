import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize";
import Rooms from "./Rooms";

class Users extends Model {

}

Users.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
}, {
  sequelize,
  tableName: 'users',
  modelName: 'users',
});

Users.belongsTo(Rooms, {
  foreignKey: 'roomId',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});


export default Users;
