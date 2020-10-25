const Sequelize = require("sequelize");
const configuration = require("../configuration");

const { db } = configuration.development;

const sequelize = new Sequelize(db.database, db.username, db.password, {
  dialect: db.dialect,
  host: db.host,
  define: {
    timestamps: false
  }
});

module.exports = sequelize;
