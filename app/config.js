/*
config : contain all configuration for application
*/
// load environment variable from .env file
require("dotenv").config()

// set config
var config = {
  db: {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    name: process.env.DB_NAME
  },
  express: {
    host: process.env.EXPRESS_HOST,
    port: process.env.EXPRESS_PORT
  }
}

//// if it's testing or migrate test db,
//// change db to testing db
if (process.env.NODE_ENV === "test" ||
  (process.argv[1].includes("migration.js") && process.argv[2] === "test")) {
  config.db.name = process.env.DB_TEST_NAME
}

// export config
module.exports = config
