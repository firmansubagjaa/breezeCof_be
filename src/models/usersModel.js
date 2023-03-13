const db = require("../../helper/connection");
// const { v4: uuidv4 } = require("uuid");

const usersModel = {
  query: (queryParams, sortType = "ASC", limit = 10, page = 1) => {
    const { firstname, gender } = queryParams
    if (firstname && gender) {
      return `WHERE firstname ILIKE '%${firstname}%' AND gender ILIKE '%${gender}%'`
    } else if (firstname || gender) {
      return `WHERE firstname ILIKE '%${firstname}%' OR gender ILIKE '%${gender}%'`
    } else {
      return `ORDER BY firstname ${sortType} LIMIT ${limit} OFFSET ${(page - 1) * limit}`
    }
  },

  get: (queryParams) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users ${usersModel.query(
          queryParams,
          queryParams.sortBy,
          queryParams.limit,
          queryParams.page
        )}`, (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve(result.rows)
          }
        }
      )
    })
  },

  // update: ({ id, username, email, image, firstname, lastname, gender, email, image, phone, birthday, delivery_address, file, }) => {
  //   return new Promise((resolve, reject) => {
  //     db.query(`SELECT * FROM users WHERE id = '${id}'`, (err, result) => {
  //       if (err) {
  //         return reject(error.message);
  //       } else {
  //         const dataUser = result.rows[0]
  //         db.query(`UPDATE user SET
  //           username='${username || dataUser.username}',
  //           email,
  //           `)
  //       }
  //     })
  //   })
  // }

}
module.exports = usersModel