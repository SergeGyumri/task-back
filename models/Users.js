import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize";
import Rooms from "./Rooms";
import md5 from 'md5'

const {ADMIN_PASSWORD, PASSWORD_SECRET, ADMIN_USER_LOGIN} = process.env;

class Users extends Model {
  static async sync(options) {
    await super.sync(options);
    await Users.create({
      login: ADMIN_USER_LOGIN, type: 1, password: ADMIN_PASSWORD
    })
  }

  static hash = (str) => {
    return md5(md5(str) + PASSWORD_SECRET);
  }
}

Users.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  type: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0
  },
  blocked: {
    type: DataTypes.TINYINT,
    defaultValue: false,
    allowNull: false,
  },
  password: {
    type: DataTypes.CHAR(32),
    get() {
      return undefined;
    },
    set(val) {
      if (val) {
        this.setDataValue('password', Users.hash(val))
      }
    }
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
