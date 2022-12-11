import { Sequelize } from "sequelize";
//utk koneksi mysql
const db = new Sequelize('silah_db', 'root', '', {
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    host: "database-1.cwltokssd1g2.ap-southeast-1.rds.amazonaws.com",
  
    dialect: "mysql"
});

export default db;

