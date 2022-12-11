# backend-collection-nodejs-3

### Version: release-1.0 (2022-12-11)

### Summary:
This is Nodejs backend number 3 from my backend collection project. This backend is a REST API for CRUD user data build with Express framework, MySQL, and sequelize ORM, also tested with Jest framework.

### Requirements:
1. nodejs (tested: v14.17.5, v18.12.1)
2. npm (tested: v6.14.14, v8.19.2)
3. mysql (tested: v8.0.31)

### Steps to run the backend server:
1. install all requirements
2. clone repository `https://github.com/reyhanfikridz/backend-collection-nodejs-3`
3. at repository root directory (same level as README.md):
    1. switch to branch release-1.0 with `git checkout release-1.0`
    2. install required node modules with `npm ci`
    3. create file .env with contents:

    ```
    # MySQL Database
    # (There's no port config because sequelize will automatically
    # use database default port, which is 3306 for mysql)
    DB_DIALECT="mysql"
    DB_HOST="<database host, example: 127.0.0.1>"
    DB_USER="<database user, example: mysql>"
    DB_PASS="<database user password>"
    DB_NAME="<database name, example: backend_collection_nodejs_3>"
    DB_TEST_NAME="<database test name, example: backend_collection_nodejs_3_test>"

    # Express
    EXPRESS_HOST="<express app host, example: 127.0.0.1>"
    EXPRESS_PORT="<express app port, example: 3000>"

    # Node environment will automatically change to "test"
    # when testing using Jest
    NODE_ENV="<development or production or test>"
    ```

    4. create mysql databases with name same as in .env file
    5. migrate database first with `npm run migrate` (database development/production) and `npm run migrate test` (database test)
    6. test server first with `npm test` to make sure server works fine
    7. run server with `npm start`

### API collection:
1. Go to https://www.postman.com/reyhanfikri/workspace/backend-collection-nodejs-3/overview
2. Choose `release-1.0` collection

### License:
This project is MIT license, so basically you can use it for personal or commercial use as long as the original LICENSE.md included in your project.
