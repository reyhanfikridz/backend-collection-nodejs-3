/*
user/router : testing all route handler user
*/
// import modules
const supertest = require("supertest")

const server = require("./../server")

// func for delete testing user data
async function deleteTestingUserData() {
  for (let i = 1; i <= 100; i++) {
    await server.db.User.destroy({where: {username: `johnwilliam${i}`}})
  }
}

// func that run before all test in this file running
beforeAll( async () => {
  await deleteTestingUserData()
})


// func that run after all test in this file done
afterAll( async () => {
  await deleteTestingUserData()
  await server.db.sequelize.close()
})

// test route add user data (POST /users)
describe("test route add user data (POST /users)", () => {
  it("should return status 201 and return the right data", async () => {
    // test add data
    data = {
      username: "johnwilliam1",
      email: "johnwilliam1@gmail.com",
      password: "thisispassword123",
      isAdmin: true
    }

    let resp = await supertest(server.app)
      .post("/api/users")
      .send(data)
      .expect(201)

    expect(resp.body.added_user).not.toBeUndefined()
    expect(resp.body.added_user).not.toBeNull()
    expect(resp.body.added_user.id).not.toBeUndefined()
    expect(resp.body.added_user.id).not.toBeNull()
    expect(resp.body.added_user.username).toStrictEqual(data.username)
    expect(resp.body.added_user.email).toStrictEqual(data.email)
    expect(resp.body.added_user.password).toStrictEqual(data.password)
    expect(resp.body.added_user.isAdmin).toStrictEqual(data.isAdmin)
  })

  it("should return status 400 because username/email already used", async () => {
    // add user data first
    data = {
      username: "johnwilliam11",
      email: "johnwilliam11@gmail.com",
      password: "thisispassword11",
      isAdmin: true
    }

    await supertest(server.app)
      .post("/api/users")
      .send(data)
      .expect(201)

    // test add user data with same username
    data = {
      username: "johnwilliam11",
      email: "johnwilliam12@gmail.com",
      password: "thisispassword12",
      isAdmin: true
    }

    let resp = await supertest(server.app)
      .post("/api/users")
      .send(data)
      .expect(400)

    expect(resp.body.message).not.toBeUndefined()
    expect(resp.body.message).not.toBeNull()

    // test add user data with same email
    data = {
      username: "johnwilliam12",
      email: "johnwilliam11@gmail.com",
      password: "thisispassword12",
      isAdmin: true
    }

    resp = await supertest(server.app)
      .post("/api/users")
      .send(data)
      .expect(400)

    expect(resp.body.message).not.toBeUndefined()
    expect(resp.body.message).not.toBeNull()
  })
})

// test route get user data (GET /users/:id)
describe("test route get user data (GET /users/:id)", () => {
  it("should return status 200 and get the right data", async () => {
    // add user data first
    data = {
      username: "johnwilliam2",
      email: "johnwilliam2@gmail.com",
      password: "thisispassword123",
      isAdmin: true
    }

    let resp = await supertest(server.app)
      .post("/api/users")
      .send(data)
      .expect(201)
    data = resp.body.added_user

    // test get user
    resp = await supertest(server.app)
      .get(`/api/users/${data.id}`)
      .expect(200)

    expect(resp.body).not.toBeUndefined()
    expect(resp.body).not.toBeNull()
    expect(resp.body.id).toStrictEqual(data.id)
    expect(resp.body.username).toStrictEqual(data.username)
    expect(resp.body.email).toStrictEqual(data.email)
    expect(resp.body.password).toStrictEqual(data.password)
    expect(resp.body.isAdmin).toStrictEqual(data.isAdmin)
  })
})

// test route get users data (GET /users)
describe("test route get users data (GET /users)", () => {
  it("should return status 200 and get the right data", async () => {
    // add users data first
    data = [{
      username: "johnwilliam3",
      email: "johnwilliam3@gmail.com",
      password: "thisispassword3",
      isAdmin: true
    }, {
      username: "johnwilliam4",
      email: "johnwilliam4@gmail.com",
      password: "thisispassword4",
      isAdmin: false
    }, {
      username: "johnwilliam5",
      email: "johnwilliam5@gmail.com",
      password: "thisispassword5",
      isAdmin: true
    }]

    for (let i = 0; i < data.length; i++) {
      let resp = await supertest(server.app)
        .post("/api/users")
        .send(data[i])
        .expect(201)

      data[i] = resp.body.added_user
    }

    // test get users
    let resp = await supertest(server.app)
      .get("/api/users?isAdmin=1")
      .expect(200)

    expect(resp.body).not.toBeUndefined()
    expect(resp.body).not.toBeNull()
    expect(resp.body.length).not.toStrictEqual(0)

    for (let i = 0; i < resp.body.length; i++) {
      expect(resp.body[i].isAdmin).toStrictEqual(true)
    }
  })
})

// test route replace user data (PUT /users/:id)
describe("test route replace user data (PUT /users/:id)", () => {
  it("should return status 200 and get the right data", async () => {
    // add user data first
    data = {
      username: "johnwilliam6",
      email: "johnwilliam6@gmail.com",
      password: "thisispassword6",
      isAdmin: false
    }

    let resp = await supertest(server.app)
      .post("/api/users")
      .send(data)
      .expect(201)
    data = resp.body.added_user

    // replace user data
    data2 = {
      username: "johnwilliam7",
      email: "johnwilliam7@gmail.com",
      password: "thisispassword7",
      isAdmin: true
    }

    resp = await supertest(server.app)
      .put(`/api/users/${data.id}`)
      .send(data2)
      .expect(200)

    expect(resp.body.user_after_replaced).not.toBeUndefined()
    expect(resp.body.user_after_replaced).not.toBeNull()
    expect(resp.body.user_after_replaced.id).toStrictEqual(data.id)
    expect(resp.body.user_after_replaced.username).toStrictEqual(data2.username)
    expect(resp.body.user_after_replaced.email).toStrictEqual(data2.email)
    expect(resp.body.user_after_replaced.password).toStrictEqual(data2.password)
    expect(resp.body.user_after_replaced.isAdmin).toStrictEqual(data2.isAdmin)

    data2 = resp.body.user_after_replaced
  })
})

// test route update user data (PATCH] /users/:id)
describe("test route update user data (PUT /users/:id)", () => {
  it("should return status 200 and get the right data", async () => {
    // add user data first
    data = {
      username: "johnwilliam8",
      email: "johnwilliam8@gmail.com",
      password: "thisispassword8",
      isAdmin: true
    }

    let resp = await supertest(server.app)
      .post("/api/users")
      .send(data)
      .expect(201)
    data = resp.body.added_user

    // update username
    let dataForUpdate = {
      username: "johnwilliam9",
    }

    resp = await supertest(server.app)
      .patch(`/api/users/${data.id}`)
      .send(dataForUpdate)
      .expect(200)

    expect(resp.body.user_after_updated).not.toBeUndefined()
    expect(resp.body.user_after_updated).not.toBeNull()
    expect(resp.body.user_after_updated.id).toStrictEqual(data.id)
    expect(resp.body.user_after_updated.username).toStrictEqual(dataForUpdate.username)
    expect(resp.body.user_after_updated.email).toStrictEqual(data.email)
    expect(resp.body.user_after_updated.password).toStrictEqual(data.password)
    expect(resp.body.user_after_updated.isAdmin).toStrictEqual(data.isAdmin)

    data = resp.body.user_after_updated

    // update email
    dataForUpdate = {
      email: "johnwilliam9@gmail.com",
    }

    resp = await supertest(server.app)
      .patch(`/api/users/${data.id}`)
      .send(dataForUpdate)
      .expect(200)

    expect(resp.body.user_after_updated).not.toBeUndefined()
    expect(resp.body.user_after_updated).not.toBeNull()
    expect(resp.body.user_after_updated.id).toStrictEqual(data.id)
    expect(resp.body.user_after_updated.username).toStrictEqual(data.username)
    expect(resp.body.user_after_updated.email).toStrictEqual(dataForUpdate.email)
    expect(resp.body.user_after_updated.password).toStrictEqual(data.password)
    expect(resp.body.user_after_updated.isAdmin).toStrictEqual(data.isAdmin)

    data = resp.body.user_after_updated

    // update password
    dataForUpdate = {
      password: "thisispassword9",
    }

    resp = await supertest(server.app)
      .patch(`/api/users/${data.id}`)
      .send(dataForUpdate)
      .expect(200)

    expect(resp.body.user_after_updated).not.toBeUndefined()
    expect(resp.body.user_after_updated).not.toBeNull()
    expect(resp.body.user_after_updated.id).toStrictEqual(data.id)
    expect(resp.body.user_after_updated.username).toStrictEqual(data.username)
    expect(resp.body.user_after_updated.email).toStrictEqual(data.email)
    expect(resp.body.user_after_updated.password).toStrictEqual(dataForUpdate.password)
    expect(resp.body.user_after_updated.isAdmin).toStrictEqual(data.isAdmin)

    data = resp.body.user_after_updated

    // update isAdmin
    dataForUpdate = {
      isAdmin: false,
    }

    resp = await supertest(server.app)
      .patch(`/api/users/${data.id}`)
      .send(dataForUpdate)
      .expect(200)

    expect(resp.body.user_after_updated).not.toBeUndefined()
    expect(resp.body.user_after_updated).not.toBeNull()
    expect(resp.body.user_after_updated.id).toStrictEqual(data.id)
    expect(resp.body.user_after_updated.username).toStrictEqual(data.username)
    expect(resp.body.user_after_updated.email).toStrictEqual(data.email)
    expect(resp.body.user_after_updated.password).toStrictEqual(data.password)
    expect(resp.body.user_after_updated.isAdmin).toStrictEqual(dataForUpdate.isAdmin)

    data = resp.body.user_after_updated
  })
})

// test route delete user data (DELETE /users/:id)
describe("test route delete user data (DELETE /users/:id)", () => {
  it("should return status 200 and get the right data", async () => {
    // add user data first
    data = {
      username: "johnwilliam10",
      email: "johnwilliam10@gmail.com",
      password: "thisispassword10",
      isAdmin: true
    }

    let resp = await supertest(server.app)
      .post("/api/users")
      .send(data)
      .expect(201)
    data = resp.body.added_user

    // delete user data
    resp = await supertest(server.app)
      .delete(`/api/users/${data.id}`)
      .send(data2)
      .expect(200)

    // get user data
    resp = await supertest(server.app)
      .get(`/api/users/${data.id}`)
      .expect(200)

    expect(resp.body).toBeNull()
  })
})
