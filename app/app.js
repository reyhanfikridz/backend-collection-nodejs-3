/*
app : contain func for initialize express application
*/
// import modules
const express = require("express")

const initializeUserRouter = require("./user/router")

// export func for initialize express application
module.exports = (db) => {
  let app = express()
  app.use(express.json())
  app.use("/api", initializeUserRouter(db))
  return app
}
