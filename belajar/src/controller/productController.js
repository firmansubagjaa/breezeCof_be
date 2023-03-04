const productModel = require("../model/product.model");
const { unlink } = require("node:fs");
const productController = {
  get: (req, res) => {
    // req.params
    // req.query
    // req.body
    return productModel
      .get(req.query)
      .then((result) => {
        //next explore
        // return formResponse("succes", result, 200)
        // return formResponse({ message: "succes", data: result, status: 200 })
        return res.status(200).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
  getDetail: (req, res) => {},
  add: (req, res) => {
    console.log(req.files);
    const request = {
      ...req.body,
      file: req.files, //uncomment if multiple
      // img: req.file.filename, //uncomment if single
      //depend on product.route, formUpload.single or formUpload.array
    };
    // console.log(req.files) //multiple
    // console.log(req.file) //(single)

    //
    //berarti kita mau bikin product yang banyak images, itu gimana?
    // 1. kita bikin 2-3 column untuk (img1, img2, img3)
    // 2. (RECOMMENDED) kita bikin table khusus untuk product_images
    //  ->id_image, id_product, name, alt_name, filename
    // -> ketika get product, join table dengan product images
    return productModel
      .add(request)
      .then((result) => {
        return res.status(201).send({ message: "succes", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
  update: (req, res) => {
    const request = {
      ...req.body,
      id: req.params.id,
      file: req.files,
    };
    return productModel
      .update(request)
      .then((result) => {
        for (let index = 0; index < result.oldImages.length; index++) {
          console.log(result.oldImages[index].filename);
          unlink(`public/uploads/images/${result.oldImages[index].filename}`, (err) => {
            // if (err) throw err;
            console.log(`successfully deleted ${result.oldImages[index].filename}`);
          });
        }
        return res.status(201).send({ message: "succes", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
  remove: (req, res) => {
    return productModel
      .remove(req.params.id)
      .then((result) => {
        for (let index = 0; index < result.length; index++) {
          unlink(`./helper/public/uploads/images/${result[0].filename}`, (err) => {
            console.log(result[index.filename]);
            if (err) throw err;
            console.log(`successfully deleted ${result[index].filename}`);
          });
        }
        return res.status(201).send({ message: "succesS deleted", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
};

module.exports = productController;

//next explore (dibikin di helper, dipisah filenya)
// const formResponse = (message, result, status)=> {
//     return res.status(status).send({
//         data: result,
//         message: result.message,
//         status: 200
//     })
// }
