const db = require("../../helper/connection");
const { v4: uuidv4 } = require("uuid");
const productModel = {
  query: (queryParams, sortType = "asc", limit = 5) => {
    if (queryParams.search && queryParams.cat) {
      return `WHERE title LIKE '%${queryParams.search}%' AND category LIKE '%${queryParams.cat}%' ORDER BY title ${sortType} LIMIT ${limit}`;
    } else if (queryParams.search || queryParams.cat) {
      return `WHERE title LIKE '%${queryParams.search}%' OR category LIKE '%${queryParams.cat}%' ORDER BY title ${sortType} LIMIT ${limit}`;
    } else {
      return `ORDER BY title ${sortType} LIMIT ${limit}`;
    }

    // const {search,cat} = queryParams
    // return `WHERE title LIKE '%${search}%' ${search && cat ?'AND':'OR'} category LIKE '%${cat}%' ORDER BY title ${sortType}`
  },
  get: function (queryParams) {
    console.log(queryParams);
    const { page = 1, limit = 15 } = queryParams;
    // ${queryParams.search && `WHERE title LIKE '%${queryParams.search}%'`}
    // ${queryParams.search && `WHERE title LIKE '%${queryParams.search}%' OR category LIKE '%${queryParams.search}%'`}
    //uncomment if single
    //   return new Promise((resolve, reject)=> {
    //     db.query(
    //         `SELECT * from products ${this.query(queryParams, queryParams.sortBy, queryParams.limit)}`,
    //         (err, result) => {
    //           if (err) {
    //             return reject(err.message)
    //           } else {
    //             return resolve(result.rows);
    //           }
    //         }
    //       );
    // })
    // uncomment if array
    return new Promise((resolve, reject) => {
      // SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate
      // FROM Orders
      // INNER JOIN Customers ON Orders.CustomerID=Customers.CustomerID;
      db.query(
        // `SELECT * FROM products`,
        // `SELECT products.id, products.title, products.category, products.price, product_images.id_product, product_images.name, product_images.filename FROM products INNER JOIN product_images ON products.id=product_images.id_product`,
        `SELECT 
                  products.id, products.title, products.price, products.category,  
                  json_agg(row_to_json(product_images)) images
                FROM products
                INNER JOIN product_images ON products.id=product_images.id_product
                GROUP BY products.id LIMIT ${limit} OFFSET (${page}-1)*${limit}`,
        // AND title ILIKE '%${queryParams.search}%'
        // AND EXISTS (SELECT * FROM products WHERE title ILIKE '%${queryParams.search}%')

        // PAGE 1
        // LIMIT = 5
        // OFFSET = 0 | OFFSET= (1-1)*5 = 0

        // PAGE 2
        // LIMIT = 5
        // OFFSET = 5
        // OFFSET= (2-1)*5 = 5
        // PAGE 3
        // LIMIT = 5
        // OFFSET = 10
        // OFFSET= (3-1)*5 = 10

        // OFFSET= (1-1)*5 = 0

        // LIMIT OFFSET
        //limit = kita membatasi limitasinya/tampilan data yang ditampilkan
        //offset = kita ngelewatin data yang mana.

        //with aliasing (keharusan) and tidak semua dari table image kita keluargkan, hanya bbrp
        //goalsnya kita keluargkan ada di detail product
        // `SELECT
        //   p.id, p.title, p.price, p.category,
        //   json_agg(row_to_json(i)) images
        // FROM products AS p
        // LEFT JOIN (SELECT id_product,name, filename FROM product_images) AS i
        // ON p.id=i.id_product
        // GROUP BY p.id`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            // for (let index = 0; index < result.rowCount; index++) {
            //   db.query(`SELECT id_image, name, filename FROM product_images WHERE id_product=$1`,[result.rows[index].id])
            //   .then((res)=> {
            //       return resolve({
            //         ...result.rows[index],
            //         images: res.rows
            //       })
            //   })
            // }
            // let results = result.rows.map((item, index)=> {
            //   db.query(`SELECT id_image, name, filename FROM product_images WHERE id_product=$1`,[item.id])
            //   .then((res)=> {
            //       return{
            //         ...item,
            //         images: res.rows
            //       }
            //   })
            // })
            // resolve(results)
            return resolve(result.rows);
          }
        }
      );
    });
  },
  getDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * from products WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve(result.rows[0]);
        }
      });
    });
  },
  add: ({ title, price, category, file }) => {
    return new Promise((resolve, reject) => {
      //table product
      db.query(`INSERT INTO products (id, title, price, category) VALUES ('${uuidv4()}','${title}','${price}','${category}') RETURNING id`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          // console.log(uuidImage, uuidProduct)
          //ini berlaku ketika upload multiple (array)
          for (let index = 0; index < file.length; index++) {
            db.query(`INSERT INTO product_images (id_image, id_product, name, filename) VALUES($1, $2 ,$3 , $4)`, [uuidv4(), result.rows[0].id, title, file[index].filename]);
          }
          //end dihapus dan files: file dihapus boleh
          return resolve({ title, price, category, images: file });
        }
      });
    });
  },
  // add:({title, img, price, category})=> {
  //   // console.log(file[0].filename)
  //     return new Promise((resolve, reject)=> {
  //       //table product
  //         db.query(
  //             `INSERT INTO products (id, title, img, price, category) VALUES ('${uuidv4()}','${title}','${img}','${price}','${category}') RETURNING id`,
  //             (err, result) => {
  //               if (err) {
  //                 return reject(err.message)
  //               } else {
  //                 return resolve({title, img, price, category})
  //               }
  //             }
  //           )
  //     })

  // },
  update: ({ id, title, img, price, category, file }) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM products WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          // result.rows[0]
          // const dataUpdate = [result.rows[0].title, result.rows[0].img, result.rows[0].price, result.rows[0].category]
          db.query(
            `UPDATE products SET title='${title || result.rows[0].title}', img='${img || result.rows[0].img}',price='${price || result.rows[0].price}', category='${category || result.rows[0].category}' WHERE id='${id}'`,
            (err, result) => {
              if (err) {
                return reject(err.message);
              } else {
                if (typeof file == "undefined") return resolve({ id, title, price, category });
                db.query(`SELECT id_image, filename FROM product_images WHERE id_product='${id}'`, (errOld, resultOld) => {
                  if (errOld) return reject({ message: errOld.message });
                  console.log(resultOld);
                  // for (let index = 0; index < file.length; index++) {
                  //   db.query(`UPDATE product_images SET filename=$1 WHERE id_product=$2`,[file[index].filename, id], (err, result)=> {
                  //     if(err) return reject({message: "image gagal dihapus"})
                  //     return resolve({id, title, price, category, oldImages: resultOld.rows, images: file})
                  //   })
                  // }
                  for (let indexOld = 0; indexOld < resultOld.rowCount; indexOld++) {
                    for (let indexNew = 0; indexNew < file.length; indexNew++) {
                      db.query(`UPDATE product_images SET filename=$1 WHERE id_image=$2`, [file[indexNew].filename, resultOld[indexOld].id_image], (err, result) => {
                        if (err) return reject({ message: "image gagal dihapus" });
                        return resolve({ id, title, price, category, oldImages: resultOld.rows, images: file });
                      });
                    }
                  }
                });
              }
            }
          );
        }
      });
    });
  },
  remove: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE from products WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          db.query(`DELETE FROM product_images WHERE id_product='${id}' RETURNING filename`, (err, result) => {
            if (err) return reject({ message: "gambar gagal dihapus" });
            return resolve(result.rows);
          });
        }
      });
    });
  },
};

module.exports = productModel;
