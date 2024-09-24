const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config");

const env = process.env.NODE_ENV || "development";
const sequelize = new Sequelize(config[env]);

const User = require("./user")(sequelize, DataTypes);

module.exports = { sequelize, User };
