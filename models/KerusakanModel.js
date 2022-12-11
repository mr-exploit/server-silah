import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;

const Kerusakan = db.define('kerusakan',{
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    judul: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    validasi: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true,
        }
    },
    keterangan: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true,
        }
    },
    image_1: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true, 
        }
    },
    image_2: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true, 
        }
    },
    image_3: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true, 
        }
    },
    image_4: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true, 
        }
    },
    url_1: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    url_2: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true, 
        }
    },
    url_3: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    url_4: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true, 
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
}, {
    freezeTableName: true
});

Users.hasMany(Kerusakan);
Kerusakan.belongsTo(Users, { foreignKey: 'userId' });


export default Kerusakan;

