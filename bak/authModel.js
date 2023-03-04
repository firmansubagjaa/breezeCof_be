const db = require("../../helper/connection");
// const { v4: uuidv4 } = require("uuid");

const productController = {
  //POST
  login: ({ username, password }) => {
    return new Promise((resolve, reject) => {
      // CARA LAMA
      // db.query(`SELECT * FROM user WHERE username = '${username}' AND password = '${password}'`, (err) => {
      //   if (err) {
      //     return reject(err.message);
      //   } else {
      //     return resolve({ title, img, price, category });
      //   }
      // });

      // CARA BARU
      db.query(`SELECT * FROM users WHERE username = '$1' AND password = '$2'`, [username, password], (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve(result);
        }
      });
    });
  },
};

module.exports = productController;
