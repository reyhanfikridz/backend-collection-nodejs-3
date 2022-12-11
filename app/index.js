/*
server : executeable file for start the application
*/
// import modules
const config = require("./config")
const server = require("./server")

// start application
server.app.listen(config.express.port, config.express.host, (err) => {
  if (err) {
    console.log(`Server failed to start! Error: ${err}`)
    process.exit(1)
  }

  console.log(`Server started successfully! `
    + `Listening at ${config.express.host}:${config.express.port}`)
})
