import { Sequelize } from "sequelize";
//utk koneksi mysql
const db = new Sequelize('silah', 'admin', 'Kambing1011', {
    host: "database-4.cwltokssd1g2.ap-southeast-1.rds.amazonaws.com",
    port: 3306,
    dialect: "mysql"
});

export default db;