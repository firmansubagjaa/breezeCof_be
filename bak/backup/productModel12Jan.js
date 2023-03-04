const db = require("../../helper/connection");
const { v4: uuidv4 } = require("uuid");

const productModel = {
  query: (queryParams, sortType = "asc", limit = 5, offset = 0) => {
    const { search, cat } = queryParams;
    if (search && cat) {
      return `WHERE title ILIKE '%${search}%' AND category ILIKE '%${cat}%' ORDER BY title ${sortType} LIMIT ${limit}`;
    } else if (search || cat) {
      return `WHERE title ILIKE '%${search}%' OR category ILIKE '%${cat}%' ORDER BY title ${sortType} LIMIT ${limit} OFFSET ${offset}`;
    } else {
      return `ORDER BY title ${sortType} LIMIT ${limit} OFFSET ${offset}`;
    }
  },
  //GET
  get: function (queryParams) {
    console.log(queryParams);
    return new Promise((resolve, reject) => {
      const { sortBy, limit, offset } = queryParams;

      // `SELECT products.id, products.title, products.category, products.price, product_images.id_images, product_images.id_product, product_images.name, product_images.filename FROM products INNER JOIN product_images ON products.id=product_images.id_product

      //query
      // if (result.rows != null) return reject({ message: "data not found" });
      db.query(`SELECT * FROM products ${this.query(queryParams, sortBy, limit, offset)}`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          for (let index = 0; index < result.rowCount; index++) {
            db.query(`SELECT id_images, name, filename FROM product_images WHERE id_product=$1`, [result.rows[index].id]).then((res) => {
              return resolve({
                ...result.rows[index],
                images: res.rows,
              });
            });
          }
          // result.rows.map((item, index) => {
          //   db.query(`SELECT id_images, name, filename FROM product_images WHERE id_product=$1`, [item.id]).then((res) => {
          //     return resolve({
          //       ...item,
          //       images: res.rows,
          //     });
          //   });
          // });
        }
      });
    });
  },

  //GET BY ID
  getDetail: ({ id }) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * from products WHERE id = '${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve(result.rows);
        }
      });
    });
  },

  //POST
  add: ({ title, img, price, category, file }) => {
    // console.log(file);
    // const uuidProduct = uuidv4();
    return new Promise((resolve, reject) => {
      //error handling
      if (title == "" && img == "" && price == "" && category == "") return reject("data harus lengkap");

      //query 1
      db.query(`INSERT INTO products (id, title, img, price, category) VALUES ('${uuidv4()}', '${title}', '${img}', '${price}', '${category}') RETURNING id`, (err, result) => {
        // console.log(result.rows[0].id);

        //check
        if (err) {
          return reject(err.message);
        } else {
          // const uuidimages = uuidv4();
          for (let index = 0; index < file.length; index++) {
            db.query(`INSERT INTO product_images (id_images, id_product, name, filename) VALUES($1, $2, $3, $4)`, [uuidv4(), result.rows[0].id, title, file[index].filename]);
          }
          return resolve({ title, img, price, category, files: file });
        }
      });
    });
  },

  //PATCH
  update: ({ id, title, img, price, category }, res) => {
    return new Promise((resolve, reject) => {
      //error handling
      if (title == "" && img == "" && price == "" && category == "") return reject("data harus lengkap");
      db.query(`SELECT * FROM products WHERE id = '${id}'`, (err, result) => {
        if (err) {
          return reject(res.status(500).send(err.message));
        } else {
          db.query(
            `UPDATE products SET title = '${title || result.rows[0].title}', img = '${img || result.rows[0].img}', price = '${price || result.rows[0].price}', category = '${category || result.rows[0].category}' WHERE id = '${id}'`,
            (err) => {
              if (err) {
                return reject(res.status(500).send(err.message));
              } else {
                return resolve({ id, title, img, price, category });
              }
            }
          );
        }
      });
    });
  },
  // update: (req, res) => {},

  // DELETE
  remove: ({ id }) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE from products WHERE id = '${id}'`, (err) => {
        if (err) {
          return reject({ message: err.message });
        } else {
          return resolve({ message: `success to delete data ${id}`, data: {} });
        }
      });
    });
  },
};

module.exports = productModel;
