/*
db : contain initialization of database with sequelize ORM
*/
// import modules
const Sequelize = require("sequelize")

const config = require("./config")
const userDefinator = require("./user/model")

// initialize db with sequelize ORM along with the models
const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, {
    host: config.db.host,
    dialect: config.db.dialect,
    operatorsAliases: 0,
    logging: false
})

const db = {
  sequelize: sequelize,
  User: userDefinator(sequelize, Sequelize)
}

// export db
module.exports = db
