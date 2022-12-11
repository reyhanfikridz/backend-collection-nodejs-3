/*
migration : executeable file for migrate database
*/
// import modules
const db = require("./db")

// migrate db
db.sequelize.sync({alter: true})
  .then(() => {
    console.log("Migrate database success!")
    process.exit(0)
  })
  .catch((err) => {
    console.log(`Migrate database failed! Error: ${err}`)
    process.exit(1)
  });
