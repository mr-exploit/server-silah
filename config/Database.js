import { Sequelize } from "sequelize";
//utk koneksi mysql
const db = new Sequelize('silah_db', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;