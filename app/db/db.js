const { Sequelize } = require("sequelize");
/* const db = new Sequelize("postgres://admin:admin:5432/macollection"); */
const db = new Sequelize(process.env.POSTGRES_URL_LOCALE);
module.exports = db;
