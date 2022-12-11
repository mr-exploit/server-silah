import { Sequelize } from "sequelize";
//utk koneksi mysql
const db = new Sequelize('silah_db', 'root', '', {
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    dialect: "mysql"
});

export default db;