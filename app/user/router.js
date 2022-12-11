/*
user/router : contain func for initialize user router
*/
// import modules
const express = require("express")

// export user router
module.exports = (db) => {
  // route handler for add data user (POST /users)
  async function addUserHandler(req, resp) {
    try {
      // set createdAt and updatedAt
      req.body.createdAt = new Date(Date.now())
      req.body.createdAt = new Date(Date.now())

      // add data
      let user = await db.User.create(req.body)
      resp.status(201).json({
        message: "Add user success!",
        added_user: user
      })
    } catch (err) {
      if (`${err}`.includes("SequelizeUniqueConstraintError")) {
        resp.status(400).json({
          message: `Add user failed! Username/Email already used`
        })
        return
      }

      console.log(err)
      resp.status(500).json({
        message: `Add user failed! Error: ${err}`
      })
    }
  }

  // route handler for get user data (GET /users/:id)
  async function getUserHandler(req, resp) {
    try {
      let user = await db.User.findOne({where: {id: req.params.id}})
      resp.status(200).json(user)
    } catch (err) {
      console.log(err)
      resp.status(500).json({
        message: `Get user failed! Error: ${err}`
      })
    }
  }

  // route handler for get users data (GET /users)
  async function getUsersHandler(req, resp) {
    try {
      let user = await db.User.findAll({where: req.query, order: [["id", "ASC"]]})
      resp.status(200).json(user)
    } catch (err) {
      console.log(err)
      resp.status(500).json({
        message: `Get user failed! Error: ${err}`
      })
    }
  }

  // route handler for replace user data (PUT /users/:id)
  async function replaceUserHandler(req, resp) {
    try {
      await db.User.update(
        {
          username: req.body.username || null,
          email: req.body.email || null,
          password: req.body.password || null,
          isAdmin: (![null, undefined].includes(req.body.isAdmin)) ? req.body.isAdmin : null,
          updatedAt: new Date(Date.now())
        },
        {where: {id: req.params.id}})

      let user = await db.User.findOne({where: {id: req.params.id}})

      resp.status(200).json({
        message: `Replace user success!`,
        user_after_replaced: user,
      })
    } catch (err) {
      if (`${err}`.includes("SequelizeValidationError")) {
        resp.status(400).json({
          message: `Replace user failed! Error: Form incompleted`
        })
        return
      }

      console.log(err)
      resp.status(500).json({
        message: `Replace user failed! Error: ${err}`
      })
    }
  }

  // route handler for update user data (PATCH /users/:id)
  async function updateUserHandler(req, resp) {
    try {
      req.body.updatedAt = new Date(Date.now())
      await db.User.update(req.body, {where: {id: req.params.id}})
      let user = await db.User.findOne({where: {id: req.params.id}})
      resp.status(200).json({
        message: `Update user success!`,
        user_after_updated: user,
      })
    } catch (err) {
      console.log(err)
      resp.status(500).json({
        message: `Update user failed! Error: ${err}`
      })
    }
  }

  // route handler for delete user data (DELETE /users/:id)
  async function deleteUserHandler(req, resp) {
    try {
      await db.User.destroy({where: {id: req.params.id}})
      resp.status(200).json({
        message: `Delete user success!`,
      })
    } catch (err) {
      console.log(err)
      resp.status(500).json({
        message: `Delete user failed! Error: ${err}`
      })
    }
  }

  // set the router
  let router = express.Router()
  router.post("/users", addUserHandler)
  router.get("/users/:id", getUserHandler)
  router.get("/users", getUsersHandler)
  router.put("/users/:id", replaceUserHandler)
  router.patch("/users/:id", updateUserHandler)
  router.delete("/users/:id", deleteUserHandler)
  return router
}
