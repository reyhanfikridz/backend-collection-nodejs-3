/*
server : contain database connection and express application
*/
// import modules
const initializeApp = require("./app")
const db = require("./db")

// initialize server
let server = {
  app: initializeApp(db),
  db: db
}

// export server
module.exports = server
